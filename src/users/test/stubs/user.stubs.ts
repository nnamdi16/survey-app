import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { UtilHelpers } from 'src/util/util';
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
  };
};

export const createUserEntityStub = (): User => {
  const userDetails = createUserStub();
  UtilHelpers.excludeProperties(userDetails, ['password']);
  return {
    ...userDetails,
    salt: '5dc111cb45e79bce52095dbf7ee3e009',
    hash: 'f2ced351e76cf7bfd55906262a5025564dca15589b5ea0f850abbd751214c768e42dea5a80a9cd45174ed3a939eb09a626ed1b3d8d0cd0f5a2ce0493b9a046d4',
  };
};
