import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'username',
            passwordField: 'password',
        });
    }

    async validate(usernameField: string, passwordField: string): Promise<any> {
        const data = {
            username: usernameField,
            password: passwordField,
        };
        const user = await this.authService.validateUser(data);
        return user;
    }
}
