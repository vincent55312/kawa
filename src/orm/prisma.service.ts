import { PrismaClient } from '@prisma/client';

export class PrismaService {
  private static prisma: PrismaClient;

  constructor() {
    if (!PrismaService.prisma) {
      PrismaService.prisma = new PrismaClient();
    }
  }

  get client() {
    return PrismaService.prisma;
  }
}
