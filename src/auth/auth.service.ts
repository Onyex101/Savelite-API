import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ValidateService } from '../validation/validate.service';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { IUser } from '../model/user.model';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly validate: ValidateService,
        private jwtService: JwtService,
    ) { }

    public async validateUser(data: { username: string, password: string }): Promise<any> {
        // validate data before checking for Admin
        const { error } = this.validate.loginValidation(data);
        if (error) {
            throw new BadRequestException(error.details[0].message);
        }
        // check if the Admin is already in database
        const user = await this.userModel.findOne({ username: data.username });
        if (!user) {
            throw new UnauthorizedException('user not found');
        }

        // check if password is correct
        const validPass = await bcrypt.compare(data.password, user.password);
        if (!validPass) {
            throw new BadRequestException('Email or password is invalid');
        }
        return user;
    }

    login(user: any) {
        return this.jwtService.sign({
            id: user._id,
            email: user.email,
        });
    }
}
