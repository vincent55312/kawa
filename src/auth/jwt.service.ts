import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = { user };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string): User {
    try {
      const payload = this.jwtService.verify(token);
      return payload.user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
