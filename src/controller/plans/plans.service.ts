import { Injectable } from '@nestjs/common';
import { ModelService } from '../model.service';
import { ObjectID } from 'mongodb';
import * as moment from 'moment';
import * as _ from 'lodash';
import * as encrypt from '../../utils/encryption';
import { PlanDto } from './../../dto/interface.dto';

@Injectable()
export class PlanService extends ModelService {

    /**
     * saves a new plan to database
     * card info is encrypted before it is saved to database
     * @param data plan info
     * @param user decoded user info from validated token
     * contains user id
     * @returns new plan details
     */
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

    /**
     * takes data from plan info supplied by user,
     * calculates withdrawal date
     * @param body plan info
     * @param user decoded user info from validated token
     * contains user id
     */
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

    /**
     * 
     * @param doc plan info with un-encrypted card details
     * @returns plan info with encrypted card details
     */
    private encryptCard(doc: any) {
        doc.card.card_no = encrypt.encryptCardNum(doc.card.card_no);
        doc.card.cvv = encrypt.encryptCVV(doc.card.cvv);
        doc.card.pin = encrypt.encryptPin(doc.card.pin);
        return doc;
    }

    /**
     * decrupt card details
     * @param doc plan info with encrypted card details
     * @returns plan info with decrypted card details
     */
    private decryptCard(doc: any) {
        doc.card.card_no = encrypt.decryptCardNum(doc.card.card_no);
        doc.card.cvv = encrypt.decryptCVV(doc.card.cvv);
        doc.card.pin = encrypt.decryptPin(doc.card.pin);
        return doc;
    }

    /**
     * hide card details
     * @param doc plan info with un-hidden card
     * @returns hidden card details
     */
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

    /**
     * retrieves encrypted card details frrom the database,
     * decrypts it then sends to user
     * @param id plan id
     * @param user decoded user info from validated token
     * contains user id
     */
    async getCard(id: string, user: any): Promise<any> {
        try {
            const doc = await this.planModel.findOne({ _id: id, _userID: user.id });
            return this.decryptCard(doc);
        } catch (error) {
            return this.errorHandler(error);
        }
    }

    /**
     * searches and returns all plans created by the user
     * @param user decoded user info from validated token
     * contains user id
     * @returns list of all plans created by the user
     */
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

    /**
     * recalculate plan info before updating the database
     * @param user decoded user info from validated token
     * contains user id
     * @param data plan info to be updated
     * @param id plan id
     */
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

    /**
     * save the updated plan info to database
     * @param plan 
     * @param user decoded user info from validated token
     * contains user id
     * @param id plan id
     * @returns the updated info
     */
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

    /**
     * delete user
     * @param user decoded user info from validated token
     * contains user id
     * @param id user id
     * @returns deletion message
     */
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
