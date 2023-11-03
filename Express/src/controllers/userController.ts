import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';
import UserDAL from '../dal/UserDAL';
import createUserModel from '../models/User'; // Updated import

import { Sequelize } from 'sequelize';

// Replace this with your Sequelize configuration
const sequelizeConfig = {
  dialect: 'mysql',
  host: 'your_database_host',
  username: 'your_username',
  password: 'your_password',
  database: 'your_database_name',
};

const sequelize = new Sequelize(sequelizeConfig);

const UserModel = createUserModel(sequelize); // Create the UserModel instance
const userDAL = new UserDAL(UserModel);

function generateAccessToken(userId: number) {
  return jwt.sign({ userId }, config.jwtSecret, { expiresIn: '1800s' });
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await userDAL.findUserByEmail(email);

    if (userExists) {
      res.status(400).json({ error: 'User already exists' });
      return; // Return early to avoid further code execution
    }

    // Create a new user with the hashed password
    const newUser = await userDAL.createUser(username, email, hashedPassword); // Provide the necessary arguments

    res.status(201).json({ message: 'User successfully registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await userDAL.findUserByEmail(email);

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
