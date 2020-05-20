import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
    fullname: string;
    username: string;
    phone_no: number;
    password: string;
    email: string;
    createdAt?: any;
    reset_password_token?: string;
    reset_password_expires?: string;
    profileImage?: string;
    imgDelHash?: string;
    firebaseToken?: string;
}

export const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        unique: true,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    phone_no: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profileImage: {
        type: String,
        default: undefined,
    },
    imgDelHash: {
        type: String,
        default: undefined,
    },
    reset_password_token: {
        type: String,
        default: undefined,
    },
    reset_password_expires: {
        type: String,
        default: undefined,
    },
    firebaseToken: {
        type: String,
        default: 'token',
    },
}, { timestamps: true });

// NOTE: Arrow functions are not used here as we do not want to use lexical scope for 'this'
UserSchema.pre<IUser>('save', function(next) {
    const user = this;
    // Make sure not to rehash the password if it is already hashed
    if (!user.isModified('password')) { return next(); }
    // Generate a salt and use it to hash the user's password
    bcrypt.genSalt(10, (err: any, salt: any) => {
        bcrypt.hash(user.password, salt, (error: any, hash: any) => {
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.checkPassword = function(attempt, callback) {
    const user = this;
    bcrypt.compare(attempt, user.password, (err, isMatch) => {
        if (err) { return callback(err); }
        callback(null, isMatch);
    });
};
