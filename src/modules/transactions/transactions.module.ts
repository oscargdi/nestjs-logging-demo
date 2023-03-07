import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpLoggingModule } from 'src/shared/http-logging';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.getOrThrow('SERVICES_BASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule extends HttpLoggingModule {}
