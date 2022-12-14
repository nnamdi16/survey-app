import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Question, QuestionSchema } from './question.entity';

@Schema({ timestamps: true, collection: 'survey' })
export class Survey extends Document {
  @Prop({ type: [QuestionSchema], required: true })
  questions: Question[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: User;
}
