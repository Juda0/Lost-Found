// reset.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resetDatabase = async () => {
  try {
    // Delete all data from the database
    console.log("Deleting all claims from the database")
    await prisma.claim.deleteMany();
    console.log("Deleting all postsfrom the database")
    await prisma.post.deleteMany();
    console.log("Deleting all users from the database")
    await prisma.user.deleteMany();

    console.log('Database reset successful');
  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
