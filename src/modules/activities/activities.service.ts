import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ActivitiesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(ActivitiesService.name)
    private readonly logger: PinoLogger,
  ) {}

  async getActivity(): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.get('/api/activity'),
    );
    const { activity } = data;
    this.logger.info(
      { operation: 'getActivity', result: 'success' },
      'Data was retrieved successfully',
    );
    return { activity: activity };
  }
}
