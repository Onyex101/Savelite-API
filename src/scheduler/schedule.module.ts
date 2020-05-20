import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendaModule } from 'nestjs-agenda';
import { configKeys } from '../config/config';
import { plansSchema } from './../model/plan.model';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Plans', schema: plansSchema },
    ]),
    AgendaModule.register({
      db: {
        address: configKeys.MONGODB_URI,
        collection: 'jobs',
        options: {
          useNewUrlParser: true,
          useFindAndModify: false,
        },
      },
      processEvery: '30 seconds',
    }),
  ],
  exports: [ScheduleService],
  providers: [ScheduleService],
})

export class ScheduleModule { }
