import { UtilHelpers } from './util';

describe('Utilhelpers static methods', () => {
  test('should call the encrypt password method', () => {
    jest.clearAllMocks();
    jest.spyOn(UtilHelpers, 'encryptPassword');
    const password = 'Password#123';
    UtilHelpers.encryptPassword(password);
    expect(UtilHelpers.encryptPassword).toHaveBeenCalledWith(password);
  });
  test('should call the encrypt password method when the password is null', () => {
    jest.clearAllMocks();
    jest.spyOn(UtilHelpers, 'encryptPassword');
    const password = null;
    UtilHelpers.encryptPassword(password);
    expect(UtilHelpers.encryptPassword).toHaveBeenCalledWith(password);
  });
  test('should call the normalize phone number method', () => {
    jest.clearAllMocks();
    jest.spyOn(UtilHelpers, 'normalizePhoneNumber');
    const phoneNumber = '07030200000';
    UtilHelpers.normalizePhoneNumber(phoneNumber);
    expect(UtilHelpers.normalizePhoneNumber).toHaveBeenCalledWith(phoneNumber);
  });
  test('should normalize the phone number when the phone number start with a +', () => {
    jest.clearAllMocks();
    jest.spyOn(UtilHelpers, 'normalizePhoneNumber');
    const phoneNumber = '+2347030200000';
    UtilHelpers.normalizePhoneNumber(phoneNumber);
    expect(UtilHelpers.normalizePhoneNumber).toHaveBeenCalledWith(phoneNumber);
  });
});
