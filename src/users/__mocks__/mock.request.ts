import { Request } from 'express';
import { userStub } from '../test/stubs/user.stubs';

export const requestMock = () => {
  return {
    user: jest.fn().mockReturnValue(userStub()),
  } as unknown as Request;
};
