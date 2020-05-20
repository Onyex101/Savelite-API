import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectID } from 'mongodb';
import * as moment from 'moment';
// import * as _ from 'lodash';
import { AgendaService } from 'nestjs-agenda';
import { IPlan } from './../model/plan.model';
// import { cardCharge } from '../utils/ravePay';

@Injectable()
export class ScheduleService {

    constructor(
        @InjectModel('Plans') protected readonly planModel: Model<IPlan>,
        private readonly agenda: AgendaService) {
        // this.createJob();
    }

    private async createJob(): Promise<void> {
        // define a job, more details
        this.agenda.define('DAILY_PLAN', async job => {
            // tslint:disable-next-line: no-console
            console.log(`job fired at ${moment().format('LLLL')}`);
            // flutterwave connect
        });
        this.agenda.define('WEEKLY_PLAN', async job => {
            // flutterwave connect
        });
        this.agenda.define('MONTHLY_PLAN', async job => {
            // flutterwave connect
        });
        // schedule a job “At 16:00 on every day-of-week.”
        // '0 16 * * */1'
        this.agenda.every('*/1 * * * *', 'DAILY_PLAN', {});
        // schedule a job “At 16:00 on every 5th day-of-week.”
        this.agenda.every('0 16 * * */5', 'WEEKLY_PLAN', {});
        // schedule a job “At 16:00 on day-of-month 28 in every month.”
        this.agenda.every('0 16 28 */1 *', 'MONTHLY_PLAN', {});
    }

    private async searchPlans(duration: string) {
        const docs = await this.planModel.find();
        return docs.filter(res => res.duration === duration);
    }

    private async ravePayConnect() {
        try {
            const plan = await this.searchPlans('daily');
            // tslint:disable-next-line: no-console
            console.log(`all plans ${plan}`);
        } catch (error) {
            // tslint:disable-next-line: no-console
            console.log(error);
        }
    }
}
