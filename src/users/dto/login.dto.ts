import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
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
  userName: string;
}
