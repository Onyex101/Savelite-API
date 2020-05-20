import { configKeys } from './../config/config';
import * as crypto from 'crypto';

const secret = configKeys.SECRET;

export function encryptCardNum(card_no: string) {
    // Encrypt card_no
    const cipher1 = crypto.createCipher('aes192', secret);
    let encrypt_cardno = cipher1.update(card_no, 'utf8', 'hex');
    encrypt_cardno += cipher1.final('hex');
    return card_no = encrypt_cardno;
}

export function encryptCVV(cvv: string) {
    // Encrypt cvv
    const cipher2 = crypto.createCipher('aes192', secret);
    let encrypt_cvv = cipher2.update(cvv, 'utf8', 'hex');
    encrypt_cvv += cipher2.final('hex');
    return cvv = encrypt_cvv;
}

export function encryptPin(pin: string) {
    // Encrypt pin
    const cipher3 = crypto.createCipher('aes192', secret);
    let encrypt_pin = cipher3.update(pin, 'utf8', 'hex');
    encrypt_pin += cipher3.final('hex');
    return pin = encrypt_pin;
}

export function decryptCardNum(card_no: string) {
    const decipher = crypto.createDecipher('aes192', secret);
    let decrypted = decipher.update(card_no, 'hex', 'utf8');
    return decrypted += decipher.final('utf8');
}

export function decryptCVV(cvv: string) {
    const decipher = crypto.createDecipher('aes192', secret);
    let decrypted = decipher.update(cvv, 'hex', 'utf8');
    return decrypted += decipher.final('utf8');
}

export function decryptPin(pin: string) {
    const decipher = crypto.createDecipher('aes192', secret);
    let decrypted = decipher.update(pin, 'hex', 'utf8');
    return decrypted += decipher.final('utf8');
}
