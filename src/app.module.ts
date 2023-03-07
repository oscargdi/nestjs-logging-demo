import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Request } from 'express';
import { LoggerModule } from 'nestjs-pino';
import { RequestLoggingInterceptor } from './interceptors/request-logging/request-logging.interceptor';
import {
  TraceIdMiddleware,
  TRACE_ID_HEADER,
} from './middlewares/trace-id/trace-id.middleware';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV === 'local'
            ? {
                target: 'pino-pretty',
              }
            : undefined,
        autoLogging: false,
        customProps: (req: Request) => {
          return { traceId: req[TRACE_ID_HEADER] };
        },
        serializers: {
          req: () => {
            return undefined;
          },
          res: () => {
            return undefined;
          },
        },
      },
    }),
    TransactionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
