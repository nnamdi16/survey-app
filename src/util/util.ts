import { pbkdf2Sync, randomBytes } from 'crypto';
import { GenericMatch } from './interface/genericMatch.interface';

export class UtilHelpers {
  static generateSaltAndHash(
    password: string,
    userSalt?: string,
  ): { salt: string; hash: string } {
    const salt = userSalt ? userSalt : randomBytes(16).toString('hex');

    const hash = pbkdf2Sync(password, salt, 1000, 64, 'SHA1').toString('hex');
    return { salt, hash };
  }

  static normalizePhoneNumber(phoneNumber: string): string {
    let phone: string = String(phoneNumber).trim().replace(/ /g, '');

    if (phone.substring(0, 1) === '+') {
      phone = phone.substring(1);
    } else if (phone.length < 12) {
      phone = `234${phone.substring(1)}`;
    }

    return `+${phone}`;
  }

  static excludeProperties(obj: GenericMatch, props: string[]) {
    const properties = props.reduce(
      (o, key) => ({ ...o, [key]: { enumerable: false } }),
      {},
    );
    return Object.defineProperties(obj, properties);
  }

  static encryptPassword(password: string | any) {
    const passwordValue = password ? password : '';
    const { salt, hash } = UtilHelpers.generateSaltAndHash(passwordValue);
    return { salt, hash };
  }

  static validatePassword(
    password: string | any,
    userSalt: string,
    userHash: string,
  ) {
    const passwordValue = password ? password : '';
    const { hash } = UtilHelpers.generateSaltAndHash(passwordValue, userSalt);
    return hash === userHash;
  }
}
