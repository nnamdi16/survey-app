import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IQuestionType } from '../enum/responseType.enum';

export type QuestionDocument = HydratedDocument<Question>;
@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, max: 450 })
  title: string;

  @Prop({ required: true, max: 32000 })
  description: string;

  @Prop({ required: true, type: IQuestionType })
  questionType: IQuestionType;

  @Prop({ required: true })
  required: boolean;

  @Prop({ required: false, default: null })
  questionTypeData: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
