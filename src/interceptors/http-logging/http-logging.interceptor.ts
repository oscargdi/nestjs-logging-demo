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
        originalUrl: req.originalUrl,
        contextType: contextType,
        controller: controller,
        handler: handler,
      },
      'Incoming HTTP request',
    );
    return next.handle().pipe(
      tap(() =>
        this.logger.info(
          {
            statusCode: context.switchToHttp().getResponse<Response>()
              .statusCode,
          },
          'Returning HTTP response',
        ),
      ),
    );
  }
}
