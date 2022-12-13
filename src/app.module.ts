import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://nnamdi16:Js5pEOQ7Jl9PqPtn@cluster0.ohalqgt.mongodb.net/survey-app',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
