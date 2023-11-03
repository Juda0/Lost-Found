import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  
function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1800s' });
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findUnique({ where: {email: email} });

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
      return; // Return early to avoid further code execution
    }
    
    // // Create a new user with the hashed password
    const newUser = await prisma.user.create({ data: {username: username, email: email, password: hashedPassword}}); // Provide the necessary arguments

    res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: {email: email} });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return; // Return early to avoid further code execution
    }

    // Compare hashed password with the provided password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = generateAccessToken(user.id);

      res.status(200).json({ message: 'Successfully logged in', token });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};
