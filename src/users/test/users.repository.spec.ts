import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { createUserEntityStub, createUserStub } from './stubs/user.stubs';
import { UserModel } from './support/user.model';

describe('UsersRepository', () => {
  let userRepository: UsersRepository;

  describe('create operation', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserModel,
          },
        ],
      }).compile();
      userRepository = moduleRef.get<UsersRepository>(UsersRepository);
    });
    describe('When create is called', () => {
      let user: User;
      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;

      beforeEach(async () => {
        saveSpy = jest.spyOn(UserModel.prototype, 'save');
        constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
        user = (await userRepository.create(
          createUserStub(),
        )) as unknown as User;
      });

      test('then it should call the userModel', () => {
        expect(saveSpy).toHaveBeenCalled();
        expect(constructorSpy).toHaveBeenLastCalledWith(createUserStub());
      });

      test('then it should return a user', () => {
        expect(user).toEqual(createUserEntityStub());
      });
    });
  });
});
