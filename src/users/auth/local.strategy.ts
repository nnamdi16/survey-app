import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UtilHelpers } from 'src/util/util';
import { UserDocument } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    super();
    // super({ usernameField: 'email' });
  }
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDocument, 'hash' | 'salt'>> {
    const { hash, salt, ...userDetails } = (await this.userRepository.findOne(
      { email: username },
      { __v: 0 },
    )) || { hash: '', salt: '', ...{} };

    const isValidPassword = UtilHelpers.validatePassword(password, salt, hash);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized user',
      });
    }
    return userDetails;
  }
}
