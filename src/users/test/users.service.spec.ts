import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import {
  createUserStub,
  loggingUserStub,
  userResponseStub,
  userStub,
} from './stubs/user.stubs';
import { UsersRepository } from '../users.repository';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { UtilHelpers } from 'src/util/util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { mockedConfigService } from '../__mocks__/configService';
// https://github.com/mguay22/nestjs-mongo

describe('UsersService', () => {
  let service: UsersService;
  const utilHelper = jest.fn();
  let repository: UsersRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            create: jest.fn().mockResolvedValue({ _doc: userStub() }),
            findOne: jest.fn().mockResolvedValue(userStub()),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(userResponseStub().data.token),
          },
        },
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create operation', () => {
    describe('create() throws error', () => {
      test('should throw error if user already exists', async () => {
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

    describe('create() method', () => {
      beforeEach(async () => {
        jest.clearAllMocks();
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);
        UtilHelpers.encryptPassword = utilHelper;
        const expectedValue = {
          salt: '9460efe9642e5618e7bdc5a5f1a3c63a',
          hash: '4fd1a475d4fb273ed0e46e2774c1894b8763e6a61943865a602389d83a4201029b223e1bd715bd4aaee0683f4d474769cb35bfcd70e21c493abda0ad841b8e8c',
        };
        utilHelper.mockReturnValue(expectedValue);
      });
      test('should encrypt the password', async () => {
        const result = service.generateToken(userStub());
        expect(result).toEqual(userResponseStub().data.token);
      });

      test('should create a new user detail', async () => {
        const result = await service.create(createUserStub());
        expect(utilHelper).toHaveBeenCalledWith(createUserStub().password);
        expect(result).toEqual(userResponseStub());
      });
    });
  });

  describe('login endpoint', () => {
    test('should provide the user token after logging in', async () => {
      const result = await service.login(loggingUserStub());
      expect(result).toEqual(userResponseStub());
    });
  });
});
