import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Observable } from 'rxjs';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  @InjectPinoLogger(RequestLoggingInterceptor.name)
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
    return next.handle();
  }
}
