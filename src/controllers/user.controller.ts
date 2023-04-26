import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dto/user.dto';

@Injectable()
@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  @Post()
  async createUser(@Body() userData: UserDto): Promise<User> {
    return this.userRepository.create({ ...userData });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UserDto,
  ): Promise<User> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.userRepository.update(id, { ...userData });
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<boolean> {
    const user = await this.userRepository.getById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return this.userRepository.delete(id);
  }
}
