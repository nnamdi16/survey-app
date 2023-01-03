export interface IUser {
  [x: string]: any;
  firstName: string;
  lastName: string;
  otherNames?: [string];
  email: string;
  mobile: string;
  password: string;
  setPassword(password: string): void;
}
