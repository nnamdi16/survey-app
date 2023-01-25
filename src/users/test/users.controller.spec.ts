import { HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersRepository } from '../users.repository';
import { UsersService } from '../users.service';
import { requestMock } from '../__mocks__/mock.request';
import { responseMock } from '../__mocks__/mock.response';
import { createUserStub, userResponseStub } from './stubs/user.stubs';
import { UserModel } from './support/user.model';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        UsersRepository,
        JwtService,
        ConfigService,
        {
          provide: getModelToken(User.name),
          useValue: UserModel,
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  describe('create endpoint', () => {
    describe('When create is called ', () => {
      let response: Response;

      beforeEach(async () => {
        response = responseMock();
        jest.spyOn(userService, 'create').mockResolvedValue(userResponseStub());
        await userController.create(createUserStub(), response);
      });

      test('then it should call userService', () => {
        expect(userService.create).toBeCalledWith(createUserStub());
      });

      test('it should return a user', () => {
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(userResponseStub());
        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      });
    });
  });
  describe('Login endpoint', () => {
    describe('When create is called ', () => {
      let response: Response;
      let request: Request;

      beforeEach(async () => {
        response = responseMock();
        request = requestMock();
        jest.spyOn(userService, 'login').mockReturnValue(userResponseStub());
        userController.login(request, response);
      });

      test('then it should call userService', () => {
        expect(userService.login).toBeCalledWith(request.user);
      });

      test('it should return a user', () => {
        expect(response.json).toHaveBeenCalledTimes(1);
        expect(response.json).toHaveBeenCalledWith(userResponseStub());
        expect(response.status).toHaveBeenCalledTimes(1);
        expect(response.status).toHaveBeenCalledWith(HttpStatus.OK);
      });
    });
  });
});
