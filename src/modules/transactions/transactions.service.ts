import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TransactionsService {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(TransactionsService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getHello(): Promise<any> {
    const { data } = await firstValueFrom(this.httpService.get('/entries'));
    this.logger.info(
      { operation: 'getHello', result: 'success' },
      'Data was retrieved successfully',
    );
    return data;
  }
}