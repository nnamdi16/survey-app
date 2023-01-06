import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDocument } from 'src/users/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
export const userStub = (): Omit<UserDocument, 'hash' | 'salt'> => {
  return {
    firstName: 'John',
    lastName: 'Doe',
    otherNames: null,
    email: 'johndoe@example.com',
    mobile: '+2347000000000',
    _id: new Types.ObjectId(uuidv4()),
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
    credentials: { salt: '', hash: '' },
  };
};
