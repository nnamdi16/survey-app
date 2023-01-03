import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { Transform } from 'class-transformer';
import { UtilHelpers } from '../../util/util';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'User firstname',
    example: 'John',
    required: true,
    title: 'firstName',
  })
  @Transform(({ value }) => String(value).toLowerCase().trim())
  firstName: string;

  @IsString()
  @ApiProperty({
    description: 'User lastname',
    example: 'Doe',
    required: true,
    title: 'lastName',
  })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  lastName: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'User othernames',
    example: ['Little'],
    required: false,
    title: 'otherNames',
  })
  @Transform(({ value }) =>
    [...value].map((item: string) => item.toLowerCase().trim()),
  )
  otherNames?: [string];

  @IsString()
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
    required: true,
    title: 'email',
  })
  @Transform(({ value }) => String(value).trim().toLowerCase())
  email: string;

  @IsString()
  @ApiProperty({
    description: 'User phone number',
    example: '+2347030000000',
    required: true,
    title: 'mobile',
  })
  @Transform(({ value }) =>
    UtilHelpers.normalizePhoneNumber(String(value).trim()),
  )
  mobile: string;

  @IsString()
  @IsStrongPassword({ minLength: 6 })
  @ApiProperty({
    description: 'This states whether the question is required or not',
    example: 'Password',
    required: true,
    title: 'required',
  })
  password: string;
}
