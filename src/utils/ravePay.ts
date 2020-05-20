import { configKeys } from './../config/config';
import * as Ravepay from 'ravepay';

const RAVE_PUBLICK_KEY = configKeys.RAVE_PUBLICK_KEY;
const RAVE_SECRET_KEY = configKeys.RAVE_SECRET_KEY;
const PRODUCTION_FLAG = configKeys.RAVE_PRODUCTION_FLAG;

const rave = new Ravepay(RAVE_PUBLICK_KEY, RAVE_SECRET_KEY, PRODUCTION_FLAG);

export function cardCharge() {
    rave.Card.charge(
        {
            cardno: '5438898014560229',
            cvv: '564',
            expirymonth: '10',
            expiryyear: '20',
            currency: 'NGN',
            country: 'NG',
            amount: '10',
            email: 'user@gmail.com',
            phonenumber: '0902620185',
            firstname: 'temi',
            lastname: 'desola',
            IP: '355426087298442',
            txRef: 'MC-' + Date.now(), // your unique merchant reference
            meta: [{ metaname: 'flightID', metavalue: '123949494DC' }],
            redirect_url: 'https://rave-webhook.herokuapp.com/receivepayment',
            device_fingerprint: '69e6b7f0b72037aa8428b70fbe03986c',
        },
    ).then(resp => {
        // console.log(resp.body);
        rave.Card.validate({
            transaction_reference: resp.body.data.flwRef,
            otp: 12345,
        }).then(response => {
            // tslint:disable-next-line: no-console
            console.log(response.body.data.tx);
        });
    }).catch(err => {
        // tslint:disable-next-line: no-console
        console.log(err);
    });
}
