import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../users.repository';

describe('UsersRepository', () => {
  let userRepository: UsersRepository;

  describe('create operation', () => {
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          UsersRepository,
          {
            provide: getModelToken(User.name),
            useValue: UserMode
          },
        ],
      });
    });
    describe('When create is called', () => {
      let user: User;
      let saveSpy: jest.SpyInstance;
      let constructorSpy: jest.SpyInstance;
    });
  });
});
