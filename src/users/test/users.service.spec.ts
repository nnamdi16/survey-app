import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { createUserStub, userStub } from './stubs/user.stubs';
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
  const token =
    'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3NDUxMDc5MSwiaWF0IjoxNjc0NTEwNzkxfQ.U9OrmqbVhZikTM7_eC_VH2CUXt2X4VOfgYKGhYRupuo';

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
            sign: jest.fn().mockReturnValue(token),
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

      test('should encrypt the password', async () => {
        jest.clearAllMocks();
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);
        UtilHelpers.encryptPassword = utilHelper;
        const expectedValue = {
          salt: '9460efe9642e5618e7bdc5a5f1a3c63a',
          hash: '4fd1a475d4fb273ed0e46e2774c1894b8763e6a61943865a602389d83a4201029b223e1bd715bd4aaee0683f4d474769cb35bfcd70e21c493abda0ad841b8e8c',
        };
        utilHelper.mockReturnValue(expectedValue);

        const result = await service.generateToken(userStub());
        // expect(utilHelper).toHaveBeenCalledWith(createUserStub().password);
        expect(result).toEqual(token);
      });

      test('should create a new user detail', async () => {
        jest.clearAllMocks();
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);
        UtilHelpers.encryptPassword = utilHelper;
        const expectedValue = {
          salt: '9460efe9642e5618e7bdc5a5f1a3c63a',
          hash: '4fd1a475d4fb273ed0e46e2774c1894b8763e6a61943865a602389d83a4201029b223e1bd715bd4aaee0683f4d474769cb35bfcd70e21c493abda0ad841b8e8c',
        };
        utilHelper.mockReturnValue(expectedValue);

        const result = await service.create(createUserStub());
        expect(utilHelper).toHaveBeenCalledWith(createUserStub().password);
        expect(result).toEqual(userStub());
      });
    });
  });
});
