import * as mongoose from 'mongoose';

export interface IExpense extends mongoose.Document {
    _userID: any;
    budgetName: string;
    budget: number;
    expenses: [
        {
            // id: string;
            date: string;
            amount: number;
            category: string;
            descr: string;
            remark: string;
            icon: string; 
        }
    ];
    images: [
        {
            id: string;
            name: string;
            datetime: number;
            type: string;
            width: number;
            height: number;
            size: number;
            deletehash: string;
            link: string;
        }
    ];
}

export const expenseSchema = new mongoose.Schema({
    _userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    budgetName: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    expenses: [
        {
            date: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            category: {
                type: String,
                required: true,
            },
            descr: {
                type: String,
                required: true,
            },
            remark: {
                type: String,
                required: true,
                default: null,
            },
            icon: {
                type: String,
                required: true,
            },
        },
    ],
    images: [
        {
            id: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            datetime: {
                type: Number,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            width: {
                type: Number,
                required: true,
            },
            height: {
                type: Number,
                required: true,
            },
            size: {
                type: Number,
                required: true,
            },
            deletehash: {
                type: String,
                required: true,
            },
            link: {
                type: String,
                required: true,
            },
        },
    ],
}, {timestamps: true});
