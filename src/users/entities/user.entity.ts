import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UtilHelpers } from 'src/util/util';
import { IUser } from '../interface/user.interface';
import { Document, HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: false, default: null })
  otherNames: [string];

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
export const userSchema = UserSchema;
userSchema.pre<IUser>('save', function () {
  const user = this as IUser;
  const { salt, hash } = UtilHelpers.generateSaltAndHash(user.password);
  this.hash = hash;
  this.salt = salt;
});
