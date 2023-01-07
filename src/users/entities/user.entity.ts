import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '../interface/user.interface';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<IUser>;
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false, default: null })
  otherNames?: [string];

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true, index: true })
  mobile: string;

  @Prop({ required: true, default: null })
  salt: string;

  @Prop({ required: true, default: null })
  hash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
