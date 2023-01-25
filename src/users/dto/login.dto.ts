import { ApiProperty, PickType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class LoginDto extends PickType(CreateUserDto, ['password'] as const) {
  @IsString()
  @ApiProperty({
    description: 'Username',
    example: 'John',
    required: true,
    title: 'email',
  })
  @Transform(({ value }) => String(value).toLowerCase().trim())
  email: string;
}
