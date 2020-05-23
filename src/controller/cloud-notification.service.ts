import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
// tslint:disable-next-line: no-var-requires
const serviceAccount = require('../../savelite-c8f57-firebase-adminsdk.json');

const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://savelite-c8f57.firebaseio.com',
});

@Injectable()
export class CloudNotificationService {
    private notificationOptions = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
    };

    async sendNotification(registrationToken: string, message: any) {
        return await admin.messaging().sendToDevice(registrationToken, message, this.notificationOptions);
    }
}
