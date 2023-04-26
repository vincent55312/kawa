import { PrismaClient, User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

interface IUserRepository {
  getById(id: string): Promise<User | null>;
  getAll(): Promise<User[]>;
  create(data: Omit<User, 'id'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async create(data: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<boolean> {
    const deletedUser = this.prisma.user.delete({ where: { id } });
    return Boolean(deletedUser);
  }
}
