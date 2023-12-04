import { PrismaClient, Prisma } from '@prisma/client';
import { IUserDAL } from '../interfaces/IUserDAL';
import { User } from '../models/user';

// class DuplicateUserError extends Error {
//   constructor(message: string) {
//     super(message);
//     this.name = 'DuplicateUserError';
//   }
// }

export class UserDAL implements IUserDAL {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createUser = async (username: string, email: string, password: string): Promise<User> => {
    try {
      const result = await this.prisma.user.create({
        data: { username, email, password },
      });
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        console.log('There is a unique constraint violation, a new user cannot be created with this email');
      }
      throw error;
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
