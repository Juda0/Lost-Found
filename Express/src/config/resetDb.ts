// reset.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function resetDatabase() {
  try {
    // Delete all data from the database
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    console.log('Database reset successful');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
