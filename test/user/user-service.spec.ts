import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../src/services/user.service';
import { CreateUserDto } from '../../src/dto/user/create-user.dto';

describe('UserService', () => {
  let userService: UserService;
  let prismaServiceMock: any;
  let jwtAuthServiceMock: any;

  beforeEach(() => {
    prismaServiceMock = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    jwtAuthServiceMock = {
      generateToken: jest.fn(),
    };

    userService = new UserService(prismaServiceMock, jwtAuthServiceMock);
  });

  describe('createUser', () => {
    it('should create a user and return a token', async () => {
      const createUserDto: CreateUserDto = {
        authKey: process.env.AUTH_KEY,
        pseudo: 'testuser',
        password: 'password123',
        userType: 'client',
      };

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      prismaServiceMock.user.findUnique.mockResolvedValue(null);
      prismaServiceMock.user.create.mockResolvedValue({
        id: 'userId',
        pseudo: createUserDto.pseudo,
        password: hashedPassword,
        userType: createUserDto.userType,
      });

      const expectedToken = 'generatedToken';
      jwtAuthServiceMock.generateToken.mockReturnValue(expectedToken);

      const result = await userService.createUser(createUserDto);

      expect(result).toEqual({ token: expectedToken });
      expect(prismaServiceMock.user.findUnique).toHaveBeenCalledWith({
        where: {
          pseudo: createUserDto.pseudo,
        },
      });
      expect(prismaServiceMock.user.create).toHaveBeenCalledWith({
        data: {
          id: expect.any(String),
          password: expect.any(String),
          pseudo: createUserDto.pseudo,
          userType: createUserDto.userType,
        },
      });
      expect(jwtAuthServiceMock.generateToken).toHaveBeenCalledWith({
        id: 'userId',
        pseudo: createUserDto.pseudo,
        password: hashedPassword,
        userType: createUserDto.userType,
      });
    });

    it('should throw BadRequestException if validation errors occur', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        authKey: '',
        pseudo: '',
        password: '',
        userType: undefined,
      };

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if authentication key is invalid', async () => {
      const createUserDto: CreateUserDto = {
        authKey: 'invalidAuthKey',
        pseudo: 'testuser',
        password: 'password123',
        userType: 'client',
      };

      // Act & Assert
      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if user with the same pseudo already exists', async () => {
      // Arrange
      const createUserDto: CreateUserDto = {
        authKey: 'validAuthKey',
        pseudo: 'existinguser',
        password: 'password123',
        userType: 'client',
      };

      prismaServiceMock.user.findUnique.mockResolvedValue({});

      await expect(userService.createUser(createUserDto)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
