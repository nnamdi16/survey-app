import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UsersService } from 'src/users/users.service';
import {
  closeMongodConnection,
  rootMongooseTestModule,
} from 'src/util/mongodb-in-memory';
import * as request from 'supertest';
import { createUserStub, userStub } from '../stubs/user.stubs';

describe('UserController', () => {
  let app: INestApplication;
  const userService = {
    create: () => userStub(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await closeMongodConnection();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(createUserStub())
        .expect(201);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userStub());
    });
  });
});
