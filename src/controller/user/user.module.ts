import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './../../model/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PlanService } from './../plans/plans.service';
import { plansSchema } from './../../model/plan.model';
import { AuthModule } from 'src/auth/auth.module';
import { expenseSchema } from 'src/model/expense.model';

@Module({
    imports: [
        forwardRef(() => AuthModule),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
            {name: 'Plans', schema: plansSchema},
            {name: 'Expense', schema: expenseSchema},
        ]),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
    ], 
    exports: [UserService, PlanService],
    controllers: [UserController],
    providers: [UserService, PlanService],
})

export class UserModule {}
