import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserDocument, 'hash' | 'salt'>> {
    const { email } = createUserDto;
    const existingUser = await this.userRepository.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User with email or mobile already exists',
      });
    }
    const { password, credentials, ...otherParams } = createUserDto;
    const userData = { ...credentials, otherParams };
    const newUser = await this.userRepository.create(userData);
    const { salt, hash, ...userDetails } = newUser;
    return userDetails;
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
