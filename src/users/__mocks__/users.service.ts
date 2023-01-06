import { userStub } from './../test/stubs/user.stubs';
export const UsersService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
});
