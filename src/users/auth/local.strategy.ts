import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UtilHelpers } from 'src/util/util';
import { UserDetails } from '../interface/user.interface';
import { UsersRepository } from '../users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string): Promise<UserDetails> {
    const response = await this.userRepository.findOne({ email }, { __v: 0 });
    if (!Object.entries(response).length) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized user',
        data: {},
      });
    }
    const { hash, salt, ...userDetails } = response;
    const isValidPassword = UtilHelpers.validatePassword(password, salt, hash);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized user',
        data: {},
      });
    }
    return userDetails;
  }
}
