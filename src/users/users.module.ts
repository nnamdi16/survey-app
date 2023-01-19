import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { LocalStrategy } from './auth/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalAuthGuard } from './auth/local.guard';
import { ENVIROMENT_VARIABLE } from 'src/util/constant';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get(ENVIROMENT_VARIABLE.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(ENVIROMENT_VARIABLE.JWT_EXPIRATION_TIME),
        },
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
  ],
  providers: [
    UsersService,
    UsersRepository,
    LocalStrategy,
    LocalAuthGuard,
    ConfigService,
  ],
})
export class UsersModule {}
