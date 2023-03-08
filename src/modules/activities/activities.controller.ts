import { Controller, Get } from '@nestjs/common';
import { ActivitiesService } from './activities.service';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Get()
  getHello(): Promise<any> {
    return this.activitiesService.getActivity();
  }
}
