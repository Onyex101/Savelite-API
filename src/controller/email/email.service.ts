/*** Documentation:
 * To make this token a one-time-use token, I encourage you to
 * use the user’s current password hash in conjunction with
 * the user’s created date (in ticks) as the secret key to
 * generate the JWT. This helps to ensure that if the user’s
 * password was the target of a previous attack (on an unrelated website),
 * then the user’s created date will make the secret key unique
 * from the potentially leaked password.
 * With the combination of the user’s password hash and created date,
 * the JWT will become a one-time-use token, because once the user
 * has changed their password, it will generate a new password hash
 * invalidating the secret key that references the old password
 * Reference: https://www.smashingmagazine.com/2017/11/safe-password-resets-with-json-web-tokens/
 **/
import { Injectable } from '@nestjs/common';
import { ModelService } from '../model.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { configKeys } from './../../config/config';
import * as sgMail from '@sendgrid/mail';
import * as MailGen from 'mailgen';

@Injectable()
export class EmailService extends ModelService {

    public async sendPasswordResetEmail(email: any) {
        try {
            const user = await this.userModel.findOne({ email });
            const secret = `${user.password}-${user.createdAt}`;
            const token = jwt.sign({ id: user._id }, secret, {
                expiresIn: 3600, // 1 hour
            });
            const url = `${configKeys.EMAIL_URL}${user._id}/${token}`;
            // await this.sendEmail(user, url);
            return { url };
        } catch (error) {
            return error;
        }
    }

    public receiveNewPassword(body: any) {
        return new Promise((resolve, reject) => {
            const { id, token, password } = body;
            this.userModel.findOne({ _id: id }).then((user) => {
                const secret = user.password + '-' + user.createdAt;
                const payload: any = jwt.verify(token, secret);
                if (payload.id === user._id) {
                    bcrypt.genSalt(10, (err, salt) => {
                        // Call error-handling middleware:
                        if (err) { reject(err); }
                        bcrypt.hash(password, salt, (er, hash) => {
                            // Call error-handling middleware:
                            if (err) { reject(er); }
                            this.userModel.findOneAndUpdate({ _id: id }, { password: hash })
                                .then(() => { resolve('Password change successful'); })
                                .catch(e => reject(e));
                        });
                    });
                } else { reject('wrong id'); }
            }).catch((e) => { reject(e); });
        });
    }

    public isUserIdValid(id: string, token: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ _id: id }).then((user) => {
                const secret = user.password + '-' + user.createdAt;
                return jwt.verify(token, secret);
            }).then((payload) => {
                resolve(true);
            }).catch((err) => { reject(false); });
        });
    }

    private resetPasswordTemplate(user: any, url: string) {
        const mailGenerator = new MailGen({
            theme: 'salted',
            product: {
                name: 'savelite',
                link: '',
            },
        });
        const email = {
            body: {
                name: user.fullname,
                intro: ['We heard that you lost your Savelite password. Sorry about that!', 'N/B: If you don’t use this link within 1 hour, it will expire.'],
                action: {
                    instructions: 'But don’t worry! You can use the following link to reset your password',
                    button: {
                        color: '#d19115',
                        text: 'Reset Password',
                        link: url,
                    },
                },
                outro: 'Your friends at Savelite',
            },
        };
        const emailTemplate = mailGenerator.generate(email);
        return {
            to: user.email,
            from: 'team@savelite.com',
            subject: '🌻 Savelite Password Reset 🌻',
            html: emailTemplate,
        };
    }

    private async sendEmail(user: any, url: any) {
        try {
            const msg = this.resetPasswordTemplate(user, url);
            sgMail.setApiKey(configKeys.SENDGRID_KEY);
            return sgMail.send(msg);
        } catch (error) {
            return error;
        }
    }
}
