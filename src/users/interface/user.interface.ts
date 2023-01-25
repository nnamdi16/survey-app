import { UserDocument } from '../entities/user.entity';

export interface IUser {
  [x: string]: any;
  firstName: string;
  lastName: string;
  otherNames?: [string];
  email: string;
  mobile: string;
  password: string;
}

export type Credentials = 'hash' | 'salt';

export type UserDetails = Omit<UserDocument, 'hash' | 'salt'>;

export interface UserResponse {
  message: string;
  status: number;
  token: string;
}
