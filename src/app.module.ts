import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { PrismaService } from './orm/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './auth/jwt.service';
import { CheckController } from './controllers/check.controller';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '8h' },
    }),
  ],
  controllers: [
    UserController,
    CheckController,
    ProductController,
    OrderController,
  ],
  providers: [
    UserService,
    PrismaService,
    JwtAuthService,
    ProductService,
    OrderService,
  ],
})
export class AppModule {}
