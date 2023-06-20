import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './orm/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './auth/jwt.service';
import { CheckController } from './controllers/check.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UserController, CheckController],
  providers: [UserService, PrismaService, JwtAuthService],
})
export class AppModule {}
