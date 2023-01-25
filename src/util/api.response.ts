import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { GenericMatch } from './interface/genericMatch.interface';

export interface ApiResponse {
  message: string;
  status: number;
  data: GenericMatch;
}

export type Modify<T, R> = Omit<T, keyof R> & R;

export class ApiResponseDTO {
  @ApiProperty({
    description: 'Response Message',
    example: '',
    required: true,
    title: 'message',
  })
  message: string;

  @ApiProperty({
    description: 'User token',
    example: {},
    required: true,
    title: 'data',
  })
  data: GenericMatch;
}

export class SuccessResponseDTO extends ApiResponseDTO {
  @ApiProperty({
    description: 'Response Http status',
    example: HttpStatus.OK,
    required: true,
    title: 'status',
  })
  status: HttpStatus;
}

export class UnAuthorisedResponseDTO extends ApiResponseDTO {
  @ApiProperty({
    description: 'Response Http status',
    example: HttpStatus.UNAUTHORIZED,
    required: true,
    title: 'status',
  })
  status: HttpStatus;
}
export class BadRequestResponseDTO extends ApiResponseDTO {
  @ApiProperty({
    description: 'Response Http status',
    example: HttpStatus.BAD_REQUEST,
    required: true,
    title: 'status',
  })
  status: HttpStatus;
}
