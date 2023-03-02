import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, OnModuleInit } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Module({ imports: [HttpModule], exports: [HttpModule] })
export class HttpLoggingModule implements OnModuleInit {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(HttpLoggingModule.name)
    private readonly logger: PinoLogger,
  ) {}

  public onModuleInit(): any {
    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use((config) => {
      this.logger.info(
        {
          method: config.method.toUpperCase(),
          url: config.url,
        },
        'Sending HTTP request',
      );
      return config;
    });

    axios.interceptors.response.use((response) => {
      const { config } = response;

      this.logger.info(
        {
          method: config.method.toUpperCase(),
          url: config.url,
          status: response.status,
          statusText: response.statusText,
        },
        'Receiving HTTP response',
      );

      return response;
    });
  }
}
