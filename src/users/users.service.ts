import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { UtilHelpers } from 'src/util/util';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) { }
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserDocument, 'hash' | 'salt'>> {
    const { email, password, ...otherParams } = createUserDto;
    const existingUser = await this.userRepository.findOne({ email });
    if (existingUser) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User with email or mobile already exists',
      });
    }
    const userSecret = UtilHelpers.encryptPassword(password);
    const userData = { ...userSecret, email, ...otherParams };
    const { _doc } = await this.userRepository.create(userData);
    UtilHelpers.excludeProperties(_doc as UserDocument, [
      'salt',
      'hash',
      '__v',
    ]);
    return _doc;
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
