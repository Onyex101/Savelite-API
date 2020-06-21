import { Controller, Get, Request, Post, UseGuards, Body, Response, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { AuthService } from './../../auth/auth.service';
import { CreateDto, LoginDto, TokenDto, ImageDto, ProfileUpdateDto } from './../../dto/interface.dto';
import { ApiUseTags, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) { }

    /**
     * creates a new user and saves the user info
     * @param data user signup info
     */
    @Post('signup')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
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

    /**
     * log in user by checking users credentials, creating a token
     * which will be attached to all protected requests made to the api
     * @param req request info
     * @param res response info
     * @param body login details
     */
    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
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
            imageDeleteHash: req.user.imageDeleteHash,
            firebaseToken: req.user.firebaseToken,
        };
        res.send(userDetails);
        return res;
    }

    /**
     * sends user info stored in database to the user
     * @param req request info
     */
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    @ApiOkResponse({description: 'The resource has been succesfully returned'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async getProfile(@Request() req) {
        try {
            const info = await this.userService.getInfo(req.user);
            return info;
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    /**
     * send token to user
     * @param req request info
     * @param body token
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('token')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async sendToken(@Request() req, @Body() body: TokenDto) {
        try {
            await this.userService.saveToken(req.user, body);
            return {status: 200, message: 'Success'};
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    /**
     * update user info
     * @param req request info
     * @param body user details
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('update')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async updateInfo(@Request() req, @Body() body: ProfileUpdateDto) {
        try {
            return await this.userService.updateProfile(req.user, body);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    /**
     * update user profile image
     * @param req request info
     * @param body image info
     */
    @UseGuards(AuthGuard('jwt'))
    @Post('image')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async updateProfileImage(@Request() req, @Body() body: ImageDto) {
        try {
            return await this.userService.changeProfileImage(req.user, body);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
