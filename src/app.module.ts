import { MiddlewareConsumer, Module } from '@nestjs/common';
import { Request } from 'express';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  TraceIdMiddleware,
  TRACE_ID_HEADER,
} from './trace-id/trace-id.middleware';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TraceIdMiddleware).forRoutes('*');
  }
}
