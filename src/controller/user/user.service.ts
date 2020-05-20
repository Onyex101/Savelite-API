import { TokenDto } from './../../dto/interface.dto';
import { Injectable } from '@nestjs/common';
import { ModelService } from '../model.service';

@Injectable()
export class UserService extends ModelService {

    /**
     * creates a new mongodb document for the user
     * @param data
     * @returns saved data containing user info
     */
    public async createUser(data: any) {
        const user = new this.userModel({
            fullname: data.name,
            username: data.username,
            phone_no: data.country_phone.phone,
            email: data.email,
            password: data.matching_passwords.password,
        });
        return await user.save();
    }

    /**
     * retrieves user details from database
     * @param user - decoded user info from validated token
     * contains user id
     * @returns doc - user information
     */
    public getInfo(user: any) {
        return new Promise((resolve, reject) => {
            this.userModel.findById(user._id).then((doc) => {
                resolve(doc);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public async saveToken(user: any, body: TokenDto) {
        return await this.userModel.findOneAndUpdate({
            _id: user.id,
        }, {$set: {firebaseToken: body.token}}, { new: true });
    }
}
