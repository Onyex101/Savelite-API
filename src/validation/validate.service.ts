import { Injectable } from '@nestjs/common';
import * as Joi from '@hapi/joi';

@Injectable()
export class ValidateService {

    // Register validation
    public admin_reg_validation(data: any) {
        const schema = Joi.object({
            full_name: Joi.string().min(6).required(),
            user_name: Joi.string().min(4).required(),
            phone_no: Joi.number().min(11).max(14).required(),
            email: Joi.string().min(5).required().email(),
            password: Joi.string().min(8).required(),
        });
        return schema.validate(data);
    }

    // login validation
    public loginValidation(data: any) {
        const schema = Joi.object({
            username: Joi.string().min(4).required(),
            password: Joi.string().min(6).required(),
        });
        return schema.validate(data);
    }
}
