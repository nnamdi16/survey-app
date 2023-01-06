import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { IUser } from '../interface/user.interface';
import { User } from '../entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Model, Types } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createUserStub, userStub } from './stubs/user.stubs';
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
  let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser(createUserStub())),
            constructor: jest
              .fn()
              .mockResolvedValue(mockUser(createUserStub())),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        _id: new Types.ObjectId(uuidv4()),
        ...userStub(),
      }),
    );
    const newUser = await service.create(createUserStub());
    expect(newUser).toEqual(mockUser(createUserStub()));
  });
});
