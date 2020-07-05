import { Controller, Get, Post, Body, Res, NotFoundException, Param } from '@nestjs/common';
import { Response } from 'express';
import { EmailResetDto, PassResPageDto } from './../../dto/interface.dto';
import { EmailService } from './email.service';
import { ApiUseTags, ApiOkResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiCreatedResponse } from '@nestjs/swagger';

/**
 * the email controller is responsible for handling all kinds of requests 
 * concerning client email in the api.
 * 
 * operations include password reset functionality and confirmation
 */
@ApiUseTags('email')
@Controller('email')
export class EmailController {
    constructor(
        private readonly emailService: EmailService,
    ) { }

    /**
     * retrieves the email sent by the client, validates it
     * then sends a password reset link to the client's mail
     * @param mail user email
     */
    @Post()
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async sendEmail(@Body() mail: EmailResetDto) {
        try {
            return await this.emailService.sendPasswordResetEmail(mail.email);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    /**
     * After the user clicks the link sent to their email,
     * user is validated then a page where they can input their new
     * passord details is displayed
     * @param res response body
     * @param id user id
     * @param token user unique token for authentication
     */
    @Get('link/:id/:token')
    @ApiOkResponse({description: 'The resource has been succesfully returned'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async resetLink(@Param('id') id: string, @Param('token') token: string, @Res() res: Response) {
        try {
            const authenticate = await this.emailService.isUserIdValid(id, token);
            if (authenticate) {
                return res.render('reset-password', {id, token});
            }
        } catch (error) {
            return res.render('404');
        }
    }

    /**
     * this endpoint is called immediately after the user submits
     * his/her new passord details
     * @param body json data containing user id, token and new password
     */
    @Post('reset')
    @ApiCreatedResponse({description: 'The resource has successfully been created'})
    @ApiForbiddenResponse({description: 'forbidden'})
    @ApiNotFoundResponse({description: 'not found'})
    async updatePassword(@Body() body: PassResPageDto) {
        try {
            return await this.emailService.receiveNewPassword(body);
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

}
