import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SurveyModule } from './survey/survey.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { ENVIROMENT_VARIABLE } from './util/constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_USERNAME: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DATABASE: Joi.string().required(),
        MONGO_HOST: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, UsersModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get(ENVIROMENT_VARIABLE.MONGO_USERNAME);
        const password = configService.get(ENVIROMENT_VARIABLE.MONGO_PASSWORD);
        const database = configService.get(ENVIROMENT_VARIABLE.MONGO_DATABASE);
        const host = configService.get(ENVIROMENT_VARIABLE.MONGO_HOST);
        const uri = `mongodb+srv://${username}:${password}@${host}`;

        return {
          uri,
          dbName: database,
        };
      },
      inject: [ConfigService],
    }),
    SurveyModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
