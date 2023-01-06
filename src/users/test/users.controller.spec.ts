import { Test, TestingModule } from '@nestjs/testing';
import { UserDocument } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { createUserStub, userStub } from './stubs/user.stubs';

jest.mock('../__mocks__/users.service');
describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  // it('should be defined', () => {
  //   expect(userController).toBeDefined();
  // });

  describe('create', () => {
    describe('When create is called ', () => {
      let user: Omit<UserDocument, 'hash' | 'salt'>;

      beforeEach(async () => {
        user = await userController.create(createUserStub());
      });

      test('then it should call userService', () => {
        expect(userService.create).toBeCalledWith(userStub());
      });

      test('it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
