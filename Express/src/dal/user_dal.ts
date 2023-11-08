import { PrismaClient } from '@prisma/client';
import { IUserDAL } from '../interfaces/IUserDAL';

export class UserDAL implements IUserDAL {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(username: string, email: string, password: string): Promise<void> {
    await this.prisma.user.create({
      data: { username, email, password },
    });
  }

  async getUserByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
