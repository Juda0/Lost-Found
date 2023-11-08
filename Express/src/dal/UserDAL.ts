import { PrismaClient } from '@prisma/client';

// DAL Interface
export interface IUserDAL {
  createUser(username: string, email: string, password: string): Promise<void>;
  findUserByEmail(email: string): Promise<any>;
}

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

  async findUserByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
