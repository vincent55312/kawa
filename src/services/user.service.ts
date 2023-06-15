import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../orm/prisma.service';
import { validate } from 'class-validator';
import { isValidUserType } from '../dto/user/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const authKey = process.env.AUTH_KEY;

    if (authKey !== createUserDto.authKey) {
      throw new BadRequestException('Invalid authentication key');
    }

    const userExists = await this.prismaService.client.user.findUnique({
      where: {
        pseudo: createUserDto.pseudo,
      },
    });

    if (userExists) {
      throw new BadRequestException('User with the same pseudo already exists');
    }

    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    if (isValidUserType(createUserDto.userType)) {
      return this.prismaService.client.user.create({
        data: {
          id: uuidv4(),
          password: createUserDto.password,
          pseudo: createUserDto.pseudo,
          userType: createUserDto.userType,
        },
      });
    } else {
      throw new BadRequestException('Invalid userType');
    }
  }
}
