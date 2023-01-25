import {
  encryptPasswordStub,
  unAuthorisedResponseStub,
} from './../stubs/user.stubs';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { UsersService } from 'src/users/users.service';
import {
  closeMongodConnection,
  rootMongooseTestModule,
} from 'src/util/mongodb-in-memory';
import { UtilHelpers } from 'src/util/util';
import * as request from 'supertest';
import {
  createUserStub,
  loggingUserStub,
  userResponseStub,
  userStub,
} from '../stubs/user.stubs';
import { UsersRepository } from 'src/users/users.repository';

describe('UserController', () => {
  let app: INestApplication;
  const utilHelper = jest.fn();

  const userService = {
    create: () => userStub(),
    login: () => userResponseStub(),
  };

  const passwordDetails = encryptPasswordStub();
  const userDetails = userStub();
  const userRepository = {
    findOne: () => ({ ...passwordDetails, ...userDetails }),
    // login: () => userResponseStub(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, rootMongooseTestModule()],
    })
      .overrideProvider(UsersService)
      .useValue(userService)
      .overrideProvider(UsersRepository)
      .useValue(userRepository)
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await closeMongodConnection();
  });

  describe('create endpoint', () => {
    it('should create a user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users/register')
        .send(createUserStub())
        .expect(201);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userStub());
    });
  });
  describe('login endpoint', () => {
    beforeEach(() => {
      UtilHelpers.validatePassword = utilHelper;
    });

    it('should login a user', async () => {
      utilHelper.mockReturnValue(true);
      const response = await request(app.getHttpServer())
        .post('/users/auth')
        .send(loggingUserStub())
        .expect(201);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(userResponseStub());
    });

    it('should not login a user for wrong passwords', async () => {
      utilHelper.mockReturnValue(false);
      const response = await request(app.getHttpServer())
        .post('/users/auth')
        .send(loggingUserStub())
        .expect(HttpStatus.UNAUTHORIZED.valueOf());
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED.valueOf());
      expect(response.body).toMatchObject(unAuthorisedResponseStub());
    });

    it('should not login a user for wrong email', async () => {
      userRepository.findOne = jest.fn().mockImplementationOnce(() => ({}));
      utilHelper.mockReturnValue(false);
      const response = await request(app.getHttpServer())
        .post('/users/auth')
        .send(loggingUserStub())
        .expect(HttpStatus.UNAUTHORIZED.valueOf());
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED.valueOf());
      expect(response.body).toMatchObject(unAuthorisedResponseStub());
    });

    it('should not login a user for wrong passwords', async () => {
      utilHelper.mockReturnValue(false);
      const response = await request(app.getHttpServer())
        .post('/users/auth')
        .send(loggingUserStub())
        .expect(HttpStatus.UNAUTHORIZED.valueOf());
      expect(response.status).toBe(HttpStatus.UNAUTHORIZED.valueOf());
      expect(response.body).toMatchObject(unAuthorisedResponseStub());
    });
  });
});
