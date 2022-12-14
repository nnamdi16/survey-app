import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IResponseType } from '../enum/responseType.enum';

@Schema({ timestamps: true })
export class Question extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: IResponseType })
  responseType: IResponseType;

  @Prop({ required: true })
  required: boolean;

  @Prop({ required: false, default: null })
  responseTypeData: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
