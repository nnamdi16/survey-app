import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';

@Module({
  controllers: [UsersController],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          return userSchema;
        },
      },
    ]),
  ],
  providers: [UsersService],
})
export class UsersModule {}
