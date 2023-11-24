import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';
import { IUserDAL } from '../interfaces/IUserDAL';
import { IUserLogic } from '../interfaces/logic/IUserLogic';
import { User } from '../models/user';

export class UserLogic implements IUserLogic {
  userDAL: IUserDAL;

  constructor(userDAL: IUserDAL) {
    this.userDAL = userDAL;
  }

  register = async (username: string, email: string, password: string): Promise<User> => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user:User = await this.userDAL.createUser(username, email, hashedPassword);
      return user;
    } catch (error) {
      console.error('Error in UserLogic.register:', error);
      throw new Error('Failed to register user');
    }
  }

  login = async (email: string, password: string): Promise<string | null> => {
    try {
      const user = await this.userDAL.getUserByEmail(email);

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1800s' });
      }

      return null;
    } catch (error) {
      console.error('Error in UserLogic.login:', error);
      throw new Error('Failed to log in');
    }
  }
}
