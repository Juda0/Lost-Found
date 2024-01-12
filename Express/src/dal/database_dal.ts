// databaseSeeder.ts

import { PrismaClient } from '@prisma/client';
import { IDatabaseDAL } from 'interfaces/IDatabaseDAL';

export class DatabaseDAL implements IDatabaseDAL{
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async seedDatabase() {
    try {
      // Seed your data here
      await this.prisma.user.create({
        data: {
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'password',
          posts: {
            create: {
              title: 'Sample Post',
              description: 'This is a sample post.',
              latitude: 40.7128, // Example latitude
              longitude: -74.0060, // Example longitude
              tags: 'tag1,tag2', // Example tags
            },
          },
        },
      });

      // Use createdUser or add any logic that involves the created user

      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }

  async resetDatabase() {
    try {
      // Delete all data from the database
      console.log("Deleting all claims from the database")
      await this.prisma.claim.deleteMany();
      console.log("Deleting all posts from the database")
      await this.prisma.post.deleteMany();
      console.log("Deleting all users from the database")
      await this.prisma.user.deleteMany();

      console.log('Database reset successful');
    } catch (error) {
      console.error('Error resetting database:', error);
    } finally {
      await this.prisma.$disconnect();
    }
  }
}