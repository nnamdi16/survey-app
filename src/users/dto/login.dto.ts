import { HttpStatus } from '@nestjs/common';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { STATUS } from 'src/util/constant';
import { CreateUserDto } from './create-user.dto';

export class LoginDto extends PickType(CreateUserDto, ['password'] as const) {
  @IsString()
  @ApiProperty({
    description: 'Username',
    example: 'John',
    required: true,
    title: 'username',
  })
  //   @Transform(({ value }) => String(value).toLowerCase().trim())
  username: string;
}

export class LoginResponse {
  @ApiProperty({
    description: 'Response Message',
    example: STATUS.SUCCESS,
    required: true,
    title: 'message',
  })
  message: string;

  @ApiProperty({
    description: 'User token',
    example: '',
    required: true,
    title: 'token',
  })
  token: string;

  @ApiProperty({
    description: 'Response Http status',
    example: HttpStatus.OK,
    required: true,
    title: 'status',
  })
  status: HttpStatus;
}
