import { plansSchema } from './../../model/plan.model';
import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';
import { UserSchema } from './../../model/user.model';
import { UserService } from './../user/user.service';
import { expenseSchema } from 'src/model/expense.model';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

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
    exports: [ExpenseService],
    controllers: [ExpenseController],
    providers: [ExpenseService],
})

export class ExpenseModule {}
