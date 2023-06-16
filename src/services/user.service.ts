import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../orm/prisma.service';
import { validate } from 'class-validator';
import { isValidUserType } from '../dto/user/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtAuthService } from '../auth/jwt.service';
import { LoginUserDto } from '../dto/user/login-user.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const errors = await validate(createUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const authKey = process.env.AUTH_KEY;
    console.log(process.env.DATABASE_URL);

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

    if (isValidUserType(createUserDto.userType)) {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const user = await this.prismaService.client.user.create({
        data: {
          id: uuidv4(),
          password: hashedPassword,
          pseudo: createUserDto.pseudo,
          userType: createUserDto.userType,
        },
      });

      const token = this.jwtAuthService.generateToken(user);

      return { token };
    } else {
      throw new BadRequestException('Invalid userType');
    }
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const errors = await validate(loginUserDto);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    const userToken = this.jwtAuthService.verifyToken(loginUserDto.token);

    if (userToken.pseudo !== loginUserDto.pseudo) {
      throw new UnauthorizedException('Invalid authentication');
    }

    const userExists = await this.prismaService.client.user.findUnique({
      where: {
        pseudo: loginUserDto.pseudo,
      },
    });

    if (!userExists) {
      throw new BadRequestException('User no existing');
    }

    const passwordMatch = await compare(
      loginUserDto.password,
      userExists.password,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtAuthService.generateToken(userExists);
    return { token };
  }
}
