import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { LoginUserDto } from '../dto/user/login-user.dto';
import { Token } from '../jwt-interceptor/token';
import { LoginUserQrcodeDto } from '../dto/user/login-user-qrcode.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ token: string }> {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Token() bearerToken: string,
  ): Promise<{ token: string }> {
    return await this.userService.loginUser(loginUserDto, bearerToken);
  }

  @Post('/login-qrcode')
  async loginUserQrcode(
    @Body() loginUserDto: LoginUserQrcodeDto,
  ): Promise<{ token: string }> {
    return await this.userService.loginUserQrcode(loginUserDto);
  }
}
