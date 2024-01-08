import { PrismaClient } from '@prisma/client';
import { IPostDAL } from '../interfaces/IPostDAL';
import { Post } from 'models/post';

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

  async getPostById( id: number) {
    try {
      return await this.prisma.post.findFirst({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData: Post) {
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
