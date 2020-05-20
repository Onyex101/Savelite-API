import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from './controller/user/user.module';
import { PlanModule } from './controller/plans/plans.module';
import { ExpenseModule } from './controller/expense/expense.module';
import { EmailModule } from './controller/email/email.module';
import { configKeys } from './config/config';
import { ScheduleModule } from './scheduler/schedule.module';

@Module({
  imports: [MongooseModule.forRoot(configKeys.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
  }),
  AuthModule, EmailModule, UserModule, PlanModule, ExpenseModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
