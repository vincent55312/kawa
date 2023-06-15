import { Controller, Post, Body } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | boolean> {
    return await this.userService.createUser(createUserDto);
  }
}
