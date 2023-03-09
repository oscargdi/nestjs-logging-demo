import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable, tap } from 'rxjs';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  @InjectPinoLogger(HttpLoggingInterceptor.name)
  private readonly logger: PinoLogger;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const handler = context.getHandler().name;
    const controller = context.getClass().name;
    const contextType = context.getType();
    this.logger.info(
      {
        method: req.method,
        path: req.path,
        contextType: contextType,
        controller: controller,
        handler: handler,
        params: Object.keys(req.query).length !== 0 ? req.query : undefined,
        data: Object.keys(req.body).length !== 0 ? req.body : undefined,
      },
      'Incoming HTTP request',
    );
    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse<Response>();
        this.logger.info(
          {
            statusCode: response.statusCode,
            data: data,
          },
          'Returning HTTP response',
        );
      }),
    );
  }
}
