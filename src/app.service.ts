import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(AppService.name) private readonly logger: PinoLogger,
  ) {}

  async getHello(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get('https://api.publicapis.org/entries'),
    );
    this.logger.info({ operation: 'getHello', result: 'success' });
    return data;
  }
}
