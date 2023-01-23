import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDetails } from 'src/users/interface/user.interface';

export const userStub = (): UserDetails => {
  return {
    firstName: 'John',
    lastName: 'Doe',
    otherNames: null,
    email: 'johndoe@example.com',
    mobile: '+2347000000000',
    _id: new Types.ObjectId('63b98e47ab65c14e3eff516f'),
  };
};

export const createUserStub = (): CreateUserDto => {
  return {
    firstName: 'John',
    lastName: 'Doe',
    otherNames: null,
    email: 'johndoe@example.com',
    mobile: '+2347000000000',
    password: 'password',
  };
};
