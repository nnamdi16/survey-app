import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async create(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserDocument, 'hash' | 'salt'>> {
    const { email } = createUserDto;
    const existingUser = await this.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        message: 'User with email or mobile already exists',
      });
    }
    const newUser = new this.userModel(createUserDto);
    newUser.encryptPassword(createUserDto.password);
    newUser.save();
    const { salt, hash, ...userDetails } = newUser;
    return userDetails;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(
    profile: Partial<Pick<UserDocument, '_id' | 'email' | 'mobile'>>,
  ): Promise<UserDocument> {
    return await this.userModel.findOne(profile).exec();
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
