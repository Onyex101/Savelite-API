import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthService } from './auth.service';
import { PlanModule } from './../controller/plans/plans.module';
import { EmailModule } from './../controller/email/email.module';
import { UserModule } from '../controller/user/user.module';
import { UserSchema } from '../model/user.model';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ValidateService } from '../validation/validate.service';
import { ExpenseModule } from './../controller/expense/expense.module';
import { configKeys } from './../config/config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => EmailModule),
    forwardRef(() => PlanModule),
    forwardRef(() => ExpenseModule),
    PassportModule.register({defaultStrategy: 'jwt', session: false}),
    JwtModule.register({
      secret: configKeys.JWT_SECRET,
      signOptions: {expiresIn: '1h'},
    }),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, ValidateService],
  exports: [AuthService],
})
export class AuthModule {}
