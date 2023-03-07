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
    this.logger.info({ originalUrl: req.originalUrl }, 'Incoming HTTP request');
    return next.handle();
  }
}
