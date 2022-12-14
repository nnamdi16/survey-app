import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { IResponseType } from '../enum/responseType.enum';

export class CreateSurveyDto {
  @IsString()
  @ApiProperty({
    description: 'Title of the question',
    example: 'What is your name?',
    required: true,
    title: 'title',
  })
  title: string;

  @IsEnum(IResponseType)
  @ApiProperty({
    description: 'Type of response',
    example: IResponseType.SHORT_ANSWER,
    required: true,
    title: 'responseType',
    enum: IResponseType,
  })
  responseType: IResponseType;

  @IsBoolean()
  @ApiProperty({
    description: 'This states whether the question is required or not',
    example: false,
    required: true,
    title: 'required',
  })
  required: boolean;

  @ApiProperty({
    description:
      'Data/options to be displayed for the correspondent respond to',
    example: null,
    required: false,
    title: 'responseTypeData',
  })
  responseTypeData: any;
}
