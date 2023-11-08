import { PrismaClient } from '@prisma/client';
import { IPostDAL } from '../interfaces/IPostDAL';

export class PostDAL implements IPostDAL {
  prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getPosts(userId: number) {
    try {
      return await this.prisma.post.findMany({
        where: { userId },
      });
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData: any) {
    try {
      return await this.prisma.post.create({
        data: postData,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default PostDAL;
