import { Injectable } from '@nestjs/common';
import { ModelService } from '../model.service';
import { ObjectID } from 'mongodb';
import { ExpenseDto, BudgetDto, ImageDto } from './../../dto/interface.dto';
import * as _ from 'lodash';

@Injectable()
export class ExpenseService extends ModelService {

    public async allBudget(user: any, id: string): Promise<any> {
        try {
            return await this.expenseModel.find({
                _userID: user.id,
            });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async addExpense(data: ExpenseDto, user: any, id: string): Promise<any> {
        const body = _.pick(data, ['date', 'amount', 'category', 'descr', 'remark', 'icon']);
        try {
            return await this.expenseModel.findOneAndUpdate({
                _userID: user.id,
                _id: id,
            }, {$push: {expenses: body}}, { new: true });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async setBudget(data: BudgetDto, user: any): Promise<any> {
        const body = _.pick(data, ['budgetName', 'budget']);
        try {
            const budget = new this.expenseModel({
                budgetName: body.budgetName,
                budget: body.budget,
                _userID: user.id,
            });
            return await budget.save();
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async editBudget(data: BudgetDto, user: any, id: string): Promise<any> {
        const body = _.pick(data, ['budgetName', 'budget']);
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        try {
            return await this.expenseModel.findOneAndUpdate({
                _id: id,
                _userID: user.id,
            }, {$set: body}, { new: true });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async removeBudget(user, budget: any) {
        try {
            return await this.expenseModel.findByIdAndRemove({
                _id: budget.id,
                _userID: user.id,
            });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async editExpense(budgetId: string, data: ExpenseDto, user: any, id: string): Promise<any> {
        const body = _.pick(data, ['date', 'amount', 'category', 'descr', 'remark', 'icon']);
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        try {
            return this.expenseModel.findOneAndUpdate({
                '_userID': user.id,
                '_id': budgetId,
                'expenses._id': id,
            }, {
                $set: {
                    'expenses.$': body,
                },
            });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async delExpense(budgetId: string, id: string, user: any): Promise<any> {
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        if (!ObjectID.isValid(budgetId)) {
            return this.errorHandler('invalid id');
        }
        try {
            await this.expenseModel.findOneAndUpdate({
                _userID: user.id,
                _id: budgetId,
            }, {$pull: {expenses: {_id: id}}});
            const newList = await this.expenseModel.findOne({
                _userID: user.id,
                _id: budgetId,
            });
            return newList.expenses;
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async addImage(id: string, data: ImageDto, user: any) {
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        const body = _.pick(data, ['id', 'name', 'datetime', 'type', 'width', 'height', 'size', 'deletehash', 'link']);
        try {
            return await this.expenseModel.findOneAndUpdate({
                _userID: user.id,
                _id: id,
            }, {$push: {images: body}}, { new: true });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    public async delImage(budgetId: string, id: string, user: any): Promise<any> {
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        if (!ObjectID.isValid(budgetId)) {
            return this.errorHandler('invalid id');
        }
        try {
            return await this.expenseModel.findOneAndUpdate(
                {
                    _id: budgetId,
                    _userID: user.id,
                }, {$pull: {images: {_id: id}}}, { new: true });
        } catch (err) {
            return this.errorHandler(err);
        }
    }

}
