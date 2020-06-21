import { TokenDto, ImageDto, ProfileUpdateDto } from './../../dto/interface.dto';
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

    /**
     * save image info to database
     * @param user decoded user info from validated token
     * contains user id
     * @param body image info
     * @returns updated image info
     */
    public async changeProfileImage(user: any, body: ImageDto) {
        return await this.userModel.findOneAndUpdate({
            _id: user.id,
        }, {$set: {
            profileImage: body.link,
            imgDelHash: body.deletehash,
        }}, {new: true});
    }

    /**
     * save user info to be updated to database
     * @param user decoded user info from validated token
     * contains user id
     * @param body new user info
     * @returns updated user info
     */
    public async updateProfile(user: any, body: ProfileUpdateDto) {
        return await this.userModel.findOneAndUpdate({
            _id: user.id,
        }, {$set: {
            [body.type]: body.input,
        }}, {new: true});
    }

    /**
     * save firebase token which will be used for push notifications
     * to database
     * @param user decoded user info from validated token
     * contains user id
     * @param body notification token
     * @returns user info
     */
    public async saveToken(user: any, body: TokenDto) {
        return await this.userModel.findOneAndUpdate({
            _id: user.id,
        }, {$set: {firebaseToken: body.token}}, { new: true });
    }
}
