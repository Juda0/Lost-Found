import { PrismaClient } from '@prisma/client';
import { IPostDAL } from '../interfaces/IPostDAL';
import { Post } from 'models/post';

export class PostDAL implements IPostDAL {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient = new PrismaClient()) {
    this.prisma = prisma;
  }

  async getAllPostsWithFilters(search: string) {
    try {
      const a = await this.prisma.post.findMany({
        where: { 
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
            { tags: { contains: search } },
          ],
        },
        orderBy: {
          status: 'asc',
        },
      });

      console.log(a)
      return a;
    } catch (error) {
      throw error;
    }
  }

  async getPostsWithFilters(userId: number, skipRecords: number, search: string) {
    try {
      const posts = await this.prisma.post.findMany({
        skip: skipRecords,
        take: 5,
        where: {
          userId,
          OR: [
            { title: { contains: search } },
            { description: { contains: search } },
            { tags: { contains: search } },
          ],
        },
        orderBy: {
          status: 'asc',
        },
      });

      const totalRecords = await this.prisma.post.count({
        where: {
          userId,
          OR: [
            { title: { contains: search } },
            { tags: { contains: search } },
          ],
        },
      });

      return { posts, totalRecords };
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
