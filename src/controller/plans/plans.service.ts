import { Injectable } from '@nestjs/common';
import { ModelService } from '../model.service';
import { ObjectID } from 'mongodb';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as encrypt from '../../utils/encryption';
import { PlanDto } from './../../dto/interface.dto';

@Injectable()
export class PlanService extends ModelService {

    public async create(data: PlanDto, user: any): Promise<any> {
        const body = _.pick(data, [
            'planName', 'periodicAmount', 'targetAmount', 'duration',
            'card',
        ]);
        try {
            const planDetails = await this.calculatePlan(body, user);
            const plan = new this.planModel(this.encryptCard(planDetails));
            const doc = await plan.save();
            return this.hideDetails(this.decryptCard(doc));
        } catch (err) {
            return this.errorHandler(err);
        }
    }

    private async calculatePlan(body, user): Promise<any> {
        const periodAmount = parseFloat(body.periodicAmount);
        const trgAmount = parseFloat(body.targetAmount);
        if (isNaN(periodAmount) || isNaN(trgAmount)) {
            return this.errorHandler('wrong input parameters');
        }
        if (periodAmount > trgAmount) {
            return this.errorHandler('amount for each period cannot be greater than the target amount');
        }
        const n = Math.ceil(trgAmount / periodAmount);
        let time: any;
        if (body.duration === 'daily') {
            time = moment().add(n, 'days');
        } else if (body.duration === 'weekly') {
            time = moment().add(n, 'weeks');
        } else if (body.duration === 'monthly') {
            time = moment().add(n, 'months');
        } else {
            return this.errorHandler(`${body.duration} is not a valid string`);
        }
        const moreDetails = {
            withdrawalDate: time,
            formatted_date: moment(time).format('LLLL'),
            _userID: user.id,
        };
        return { ...body, ...moreDetails };
    }

    private encryptCard(doc: any) {
        doc.card.card_no = encrypt.encryptCardNum(doc.card.card_no);
        doc.card.cvv = encrypt.encryptCVV(doc.card.cvv);
        doc.card.pin = encrypt.encryptPin(doc.card.pin);
        return doc;
    }

    private decryptCard(doc: any) {
        doc.card.card_no = encrypt.decryptCardNum(doc.card.card_no);
        doc.card.cvv = encrypt.decryptCVV(doc.card.cvv);
        doc.card.pin = encrypt.decryptPin(doc.card.pin);
        return doc;
    }

    private hideDetails(doc: any) {
        doc.card.cvv = '***';
        doc.card.pin = '****';
        doc.card.lastname = '*****';
        doc.card.expiry_date = '*****';
        const num: string = doc.card.card_no;
        const cardNum: number = num.length;
        const b = num.slice((cardNum - 4), cardNum);
        doc.card.card_no = '**********' + b;
        return doc;
    }

    async getCard(id: string, user: any): Promise<any> {
        try {
            const doc = await this.planModel.findOne({ _id: id, _userID: user.id });
            return this.decryptCard(doc);
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    async allPlans(user: any): Promise<any> {
        try {
            const doc = await this.planModel.find({ _userID: user.id });
            doc.forEach(element => {
                element = this.hideDetails(this.decryptCard(element));
            });
            return doc;
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    async update(user: any, data: any, id: any): Promise<any> {
        data.card.amount = 0;
        const body = {
            planName: data.planName,
            targetAmount: data.targetAmount,
            periodicAmount: data.periodicAmount,
            duration: data.duration,
            card: data.card,
        };
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        try {
            await this.planModel.findById(id);
            const res = await this.calculatePlan(body, user);
            const plan = this.encryptCard(res);
            const newPlan = await this.saveUpdate(plan, user, id);
            return newPlan;
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    private async saveUpdate(plan, user, id): Promise<any> {
        try {
            let doc = await this.planModel.findOneAndUpdate({
                _id: id,
                _userID: user.id,
            }, { $set: plan }, { new: true });
            doc = this.hideDetails(this.decryptCard(doc));
            return doc;
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    async delete(user: any, id: any): Promise<any> {
        if (!ObjectID.isValid(id)) {
            return this.errorHandler('invalid id');
        }
        try {
            await this.planModel.findOneAndDelete({
                _id: id,
                _userID: user.id,
            });
            return { message: 'plan deletion successfull' };
        } catch (error) {
            return this.errorHandler('plan deletion successfull');
        }
    }
}
