import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(compression());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Survey App APIs')
    .setDescription('API service to power a Survey Application')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('survey-app')
    .setContact(
      'Nwabuokei Nnamdi',
      'https://github.com/nnamdi16/survey-app',
      'nwabuokeinnamdi19@gmail.com',
    )
    .setExternalDoc('Postman Collection', '/api-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api', app, document);
  await app.listen(8000);
}
bootstrap();
