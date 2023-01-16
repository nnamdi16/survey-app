import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UtilHelpers } from 'src/util/util';
import { UserDocument } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UsersRepository) {
    console.log('Fear is a looser');
    super({ usernameField: 'email' });
  }
  async validate(
    username: string,
    password: string,
  ): Promise<Omit<UserDocument, 'hash' | 'salt'>> {
    console.log('Coming from America');
    const { hash, ...otherDetails } = await this.userRepository.findOne(
      { email: username },
      { hash: 1 },
    );
    const isValidPassword = UtilHelpers.decryptPassword(password, hash);
    if (!isValidPassword) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Unauthorized user',
      });
    }
    return otherDetails;
  }
}
