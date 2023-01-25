import { encryptPasswordStub } from 'src/users/test/stubs/user.stubs';
import { UtilHelpers } from './util';

describe('Utilhelpers static methods', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('encryptPassword method', () => {
    beforeEach(() => {
      jest.spyOn(UtilHelpers, 'encryptPassword');
    });
    test('should call the encrypt password method', () => {
      const password = 'Password#123';
      UtilHelpers.encryptPassword(password);
      expect(UtilHelpers.encryptPassword).toHaveBeenCalledWith(password);
    });
    test('should call the encrypt password method when the password is null', () => {
      const password = null;
      UtilHelpers.encryptPassword(password);
      expect(UtilHelpers.encryptPassword).toHaveBeenCalledWith(password);
    });
  });

  describe('normalizePhoneNumber method', () => {
    let phoneNumber: string;
    beforeEach(() => {
      jest.spyOn(UtilHelpers, 'normalizePhoneNumber');
      phoneNumber = '+2347030200000';
    });
    test('should normalize phone number without +234 attached', () => {
      const userPhoneNumber = '07030200000';
      const phoneNumberDetails =
        UtilHelpers.normalizePhoneNumber(userPhoneNumber);
      expect(UtilHelpers.normalizePhoneNumber).toHaveBeenCalledWith(
        userPhoneNumber,
      );
      expect(phoneNumberDetails).toEqual(phoneNumber);
    });
    test('should normalize the phone number when the phone number start with a +234', () => {
      const phoneNumberDetails = UtilHelpers.normalizePhoneNumber(phoneNumber);
      expect(UtilHelpers.normalizePhoneNumber).toHaveBeenCalledWith(
        phoneNumber,
      );
      expect(phoneNumberDetails).toEqual(phoneNumber);
    });
    test('should normalize the phone number when the phone number start with 234', () => {
      const userPhoneNumber = '2347030200000';
      const phoneNumberDetails =
        UtilHelpers.normalizePhoneNumber(userPhoneNumber);
      expect(UtilHelpers.normalizePhoneNumber).toHaveBeenCalledWith(
        userPhoneNumber,
      );
      expect(phoneNumberDetails).toEqual(phoneNumber);
    });
  });

  describe('validatePassword method', () => {
    beforeEach(() => {
      jest.spyOn(UtilHelpers, 'validatePassword');
    });
    test('validate password', () => {
      const password = 'Password#12345';
      const { salt, hash } = encryptPasswordStub();
      const validPassword = UtilHelpers.validatePassword(password, salt, hash);
      expect(UtilHelpers.validatePassword).toHaveBeenCalledWith(
        password,
        salt,
        hash,
      );
      expect(validPassword).toBeTruthy();
    });
    test('validate instances when the password value is falsy', () => {
      const password = null;
      const { salt, hash } = encryptPasswordStub();
      const validPassword = UtilHelpers.validatePassword(password, salt, hash);
      expect(UtilHelpers.validatePassword).toHaveBeenCalledWith(
        password,
        salt,
        hash,
      );
      expect(validPassword).toBeFalsy();
    });
  });
});
