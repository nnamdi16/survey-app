import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ENVIROMENT_VARIABLE, STATUS } from 'src/util/constant';
import { UtilHelpers } from 'src/util/util';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './entities/user.entity';
import { UserDetails } from './interface/user.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserDocument, 'hash' | 'salt'>> {
    try {
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
      const token = this.generateToken(_doc);
      return { message: STATUS.SUCCESS, token, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(error?.response?.message, HttpStatus.BAD_REQUEST);
    }
  }

  generateToken(payload: UserDetails) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get(ENVIROMENT_VARIABLE.JWT_SECRET),
      expiresIn: `${this.configService.get(
        ENVIROMENT_VARIABLE.JWT_EXPIRATION_TIME,
      )}s`,
    });
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
