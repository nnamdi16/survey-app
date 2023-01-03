import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { Question, QuestionSchema } from './question.entity';

export type SurveyDocument = HydratedDocument<Survey>;
@Schema({ timestamps: true, collection: 'survey' })
export class Survey {
  @Prop({ type: [QuestionSchema], required: true, default: () => [] })
  questions: [Question];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: User;

  @Prop({ required: true, max: 450 })
  title: string;

  @Prop({ required: true, max: 32000 })
  description: string;
}
