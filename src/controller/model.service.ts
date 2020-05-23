import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPlan } from './../model/plan.model';
import { IUser } from './../model/user.model';
import { IExpense } from './../model/expense.model';
import { CloudNotificationService } from './cloud-notification.service';

@Injectable()
export abstract class ModelService {
    constructor(
        @InjectModel('User') protected readonly userModel: Model<IUser>,
        @InjectModel('Plans') protected readonly planModel: Model<IPlan>,
        @InjectModel('Expense') protected readonly expenseModel: Model<IExpense>,
        protected notification: CloudNotificationService,
    ) {}

    protected errorHandler(err: any) {
        return { msg: err };
    }

}
