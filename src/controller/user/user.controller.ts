import { Controller, Get, Request, Post, UseGuards, Body, Response, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from './../../auth/auth.service';
import { CreateDto, LoginDto, TokenDto } from './../../dto/interface.dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    async signup(@Body() data: CreateDto) {
        try {
            return await this.userService.createUser(data);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error,
              }, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req, @Response() res, @Body() body: LoginDto) {
        const token = this.authService.login(req.user);
        delete req.user.password;
        res.setHeader('Authorization', `Bearer ${token}`);
        const userDetails = {
            id: req.user._id,
            username: req.user.username,
            fullname: req.user.fullname,
            email: req.user.email,
            phone_no: req.user.phone_no,
            profileImage: req.user.profileImage,
            firebaseToken: req.user.firebaseToken,
        };
        res.send(userDetails);
        return res;
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    async getProfile(@Request() req) {
        try {
            const info = await this.userService.getInfo(req.user);
            return info;
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('token')
    async sendToken(@Request() req, @Body() body: TokenDto) {
        try {
            await this.userService.saveToken(req.user, body);
            return {status: 200, message: 'Success'};
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
