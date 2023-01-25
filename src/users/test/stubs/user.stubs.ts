import { HttpStatus } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserDetails } from 'src/users/interface/user.interface';
import { ApiResponse, Modify } from 'src/util/api.response';

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
export const userResponseStub = (): Modify<
  ApiResponse,
  { data: { token: string } }
> => {
  return {
    message: 'SUCCESS',
    status: HttpStatus.OK.valueOf(),
    data: {
      token:
        'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NDUxMDc5MSwiaWF0IjoxNjc0NTEwNzkxfQ.U9OrmqbVhZikTM7_eC_VH2CUXt2X4VOfgYKGhYRupuo',
    },
  };
};
export const unAuthorisedResponseStub = (): ApiResponse => {
  return {
    message: 'Unauthorized user',
    status: HttpStatus.UNAUTHORIZED.valueOf(),
    data: {},
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
export const loggingUserStub = (): Pick<
  CreateUserDto,
  'email' | 'password'
> => {
  return {
    email: 'johndoe@example.com',
    password: 'password',
  };
};
export const loggingWithoutUserStub = (): Pick<
  CreateUserDto,
  'email' | 'password'
> => {
  return {
    email: '',
    password: '',
  };
};

export const encryptPasswordStub = () => {
  return {
    salt: '7df323a0b4af89e1861cddb1ddb0bc3a',
    hash: 'b0c2282cced4bf4b70e70584a0d11b59fe3f4391b7882ea0525b1dda4005ebd13496c192e69de96f94b860f9fa9b8cad204e9553e33a9c53d2edc8103013a78b',
  };
};
