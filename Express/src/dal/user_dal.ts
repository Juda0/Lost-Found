import { PrismaClient  } from '@prisma/client';
import { IUserDAL } from '../interfaces/IUserDAL';
import { User } from '../models/user';

export class UserDAL implements IUserDAL {
  prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma || new PrismaClient();
  }

  createUser = async (username: string, email: string, password: string): Promise<User> => {
    try {
      const result = await this.prisma.user.create({
        data: { username, email, password },
      });
      return result;
    } catch (e: unknown) {
      if (e instanceof Error && e.message.includes('P2002')) {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
      }
      throw e
    }
  }

  getUserByEmail = async (email: string): Promise<any> => {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw new Error('Failed to get user by email');
    }
  }
}
