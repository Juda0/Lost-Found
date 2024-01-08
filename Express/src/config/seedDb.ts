// seed.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDatabase() {
  try {
    // Seed your data here
    await prisma.user.create({
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
    await prisma.$disconnect();
  }
}

seedDatabase();
