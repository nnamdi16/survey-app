import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';
import { createUserStub, userStub } from './stubs/user.stubs';
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
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('find operations', () => {
    // let userModel: UserModel;
    let userFilterQuery: FilterQuery<User>;
    let projections: FilterQuery<User>;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useClass: UserModel,
          },
        ],
      }).compile();
      userRepository = moduleRef.get<UsersRepository>(UsersRepository);
      // userModel = moduleRef.get<UserModel>(getModelToken(User.name));

      userFilterQuery = {
        email: createUserStub().email,
      };
      projections = { __v: 0 };

      jest.clearAllMocks();
    });
    describe('findOne', () => {
      describe('when findOne is called', () => {
        let user: User;

        beforeEach(async () => {
          UserModel.prototype.findOne = jest
            .fn()
            .mockImplementationOnce(() => ({
              exec: jest.fn().mockReturnValueOnce(userStub()),
            }));
          user = (await userRepository.findOne(
            userFilterQuery,
          )) as unknown as User;
        });

        test('then it should call the userModel', () => {
          const findOneSpy = jest.spyOn(UserModel.prototype, 'findOne');
          expect(findOneSpy).toHaveBeenCalledWith(
            expect.objectContaining({ ...userFilterQuery }),
            expect.objectContaining(projections),
          );
        });

        test('then it should return a user', () => {
          expect(user).toEqual(userStub());
        });
      });
    });
  });
});
