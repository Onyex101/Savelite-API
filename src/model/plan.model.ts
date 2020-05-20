import * as mongoose from 'mongoose';

export interface IPlan extends mongoose.Document {
    _userID: any;
    planName: string;
    periodicAmount: string;
    targetAmount: string;
    withdrawalDate: string;
    duration: string;
    formatted_date: string;
    card: {
        firstname: string;
        lastname: string;
        expiry_date: string;
        card_no: string;
        pin: string;
        amount: string;
        cvv: string;
    };
}

export const plansSchema = new mongoose.Schema({
    _userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    planName: {
        type: String,
        required: true,
        unique: true,
    },
    periodicAmount: {
        type: Number,
        required: true,
    },
    targetAmount: {
        type: String,
        required: true,
    },
    withdrawalDate: {
        type: Date,
        required: true,
    },
    formatted_date: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    card: {
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        expiry_date: {type: String, required: true},
        card_no: {type: String, required: true},
        pin: {type: String, required: true},
        amount: {type: String, default: '0'},
        cvv: {type: String, required: true},
    },
}, {timestamps: true});
