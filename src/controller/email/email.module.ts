import { AuthModule } from './../../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './../../model/user.model';
import { EmailController } from './email.controller';
import { plansSchema } from './../../model/plan.model';
import { PlanModule } from './../plans/plans.module';
import { UserModule } from './../user/user.module';
import { EmailService } from './email.service';
import { expenseSchema } from 'src/model/expense.model';

@Module({
    imports: [
        forwardRef(() => AuthModule), UserModule, PlanModule,
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'Plans', schema: plansSchema},
            {name: 'Expense', schema: expenseSchema},
        ]),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
    ],
    exports: [EmailService],
    controllers: [EmailController],
    providers: [EmailService],
})

export class EmailModule {}
