import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { IUser } from '../interface/user.interface';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createUserStub } from './stubs/user.stubs';
import { UsersRepository } from '../users.repository';
// https://github.com/mguay22/nestjs-mongo

const mockUser = (user: CreateUserDto): Omit<IUser, 'password'> => {
  const { firstName, lastName, otherNames, email, mobile } = user;
  return {
    firstName,
    lastName,
    otherNames,
    email,
    mobile,
  };
};

const mockUserDoc = (mock?: Partial<IUser>): Partial<User> => ({
  firstName: mock?.firstName || 'John',
  lastName: mock?.lastName || 'Doe',
  // _id: new Types.ObjectId(uuidv4()),
});

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        UsersRepository,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser(createUserStub())),
            constructor: jest
              .fn()
              .mockResolvedValue(mockUser(createUserStub())),
            create: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create operation', () => {
    // beforeEach(async () => {
    //   const moduleRef = await Test.createTestingModule({
    //     providers: [
    //       UsersRepository,
    //       {
    //         provide: getModelToken(User.name),
    //         useValue: UserModel,
    //       },
    //     ],
    //   }).compile();
    //   userRepository = moduleRef.get<UsersRepository>(UsersRepository);
    // });
    describe('When create is called', () => {
      let user: User;
      let createUser: CreateUserDto;
      // let saveSpy: jest.SpyInstance;
      // let constructorSpy: jest.SpyInstance;

      beforeEach(async () => {
        // createSpy = jest.spyOn();
        // saveSpy = jest.spyOn(UserModel.prototype, 'save');
        // constructorSpy = jest.spyOn(UserModel.prototype, 'constructorSpy');
        user = (await service.create(createUserStub())) as unknown as User;
        // user = (await userRepository.create(
        //   createUserStub(),
        // )) as unknown as User;
      });

      test('then it should call the userModel', () => {
        // expect(saveSpy).toHaveBeenCalled();
        expect(repository.create).toHaveBeenLastCalledWith(createUserStub());
      });

      // test('then it should return a user', () => {
      //   expect(user).toEqual(createUserEntityStub());
      // });
    });
  });

  // it('should create a new user', async () => {
  //   jest.spyOn(model, 'create').mockImplementationOnce(() =>
  //     Promise.resolve({
  //       _id: new Types.ObjectId(uuidv4()),
  //       ...userStub(),
  //     }),
  //   );
  //   const newUser = await service.create(createUserStub());
  //   expect(newUser).toEqual(mockUser(createUserStub()));
  // });
});
