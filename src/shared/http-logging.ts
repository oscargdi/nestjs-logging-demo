import { HttpService } from '@nestjs/axios';
import { Inject, OnModuleInit } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

export abstract class HttpLoggingModule implements OnModuleInit {
  @Inject()
  private readonly httpService: HttpService;
  @InjectPinoLogger(HttpLoggingModule.name)
  private readonly logger: PinoLogger;

  public onModuleInit(): any {
    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use((config) => {
      this.logger.info(
        {
          method: config.method.toUpperCase(),
          baseURL: config.baseURL,
          url: config.url,
          data: config.data,
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
          baseURL: config.baseURL,
          url: config.url,
          status: response.status,
          statusText: response.statusText,
          data: response.data,
        },
        'Receiving HTTP response',
      );

      return response;
    });
  }
}
