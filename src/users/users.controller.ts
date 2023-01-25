import {
  Controller,
  Post,
  Body,
  Request,
  Response,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiResponse, ApiTags, OmitType } from '@nestjs/swagger';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { LocalAuthGuard } from './auth/local.guard';
import { Request as Requests, Response as Responses } from 'express';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Response() res: Responses,
  ) {
    const response = await this.usersService.create(createUserDto);
    return res.json(response).status(HttpStatus.OK);
  }

  @Post('auth')
  @UseGuards(LocalAuthGuard)
  @ApiBody({
    type: LoginDto,
    description: 'Login Response',
  })
  @ApiResponse({
    type: LoginResponse,
    status: HttpStatus.OK,
    description: 'Successfully logged In',
    // links: {},
  })
  @ApiResponse({
    type: OmitType(LoginResponse, ['token'] as const),
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
    // links: {},
  })
  login(@Request() req: Requests, @Response() res: Responses) {
    const response = this.usersService.generateToken(req.user);
    return res.json(response).status(HttpStatus.OK);
  }
  /**
 * {
  "password": "Password#123",
  "username": "johndoe@example.com"
}
 */
  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   // return this.usersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
