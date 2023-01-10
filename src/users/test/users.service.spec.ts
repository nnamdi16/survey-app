import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersService } from '../users.service';
import { IUser } from '../interface/user.interface';
import { User } from '../entities/user.entity';
import { createUserStub, userStub } from './stubs/user.stubs';
import { UsersRepository } from '../users.repository';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
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
  // let repository: UsersRepository;
  // let model: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn().mockResolvedValue(userStub()),
            findOne: jest.fn().mockResolvedValue(userStub()),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create operation', () => {
    describe('When create is called', () => {
      test('then it should call the userModel', async () => {
        try {
          await service.create(createUserStub());
        } catch (error) {
          expect(error).toBeInstanceOf(HttpException);
        }
      });

      test('then it should call the userModel', async () => {
        await expect(service.create(createUserStub())).rejects.toEqual(
          new BadRequestException({
            status: HttpStatus.BAD_REQUEST,
            message: 'User with email or mobile already exists',
          }),
        );
      });
    });
  });
});
