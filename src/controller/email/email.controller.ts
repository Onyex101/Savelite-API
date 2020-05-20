import { Controller, Get, Post, UseGuards, Body, Res, NotFoundException, Param } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { EmailResetDto, PassResPageDto } from './../../dto/interface.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
    ) { }

    @Post()
    async sendEmail(@Body() mail: EmailResetDto) {
        try {
            return await this.emailService.sendPasswordResetEmail(mail.email);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    @Get('reset/:id/:token')
    async resetPassword(@Res() res: Response, @Param('id') id: string, @Param('token') token: string) {
        if (await this.emailService.isUserIdValid(id, token)) {
            return res.render('reset-password', {id, token});
        }
        throw new NotFoundException();
    }

    @Post('reset')
    async updatePassword(@Body() body: PassResPageDto) {
        try {
            return await this.emailService.receiveNewPassword(body);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
