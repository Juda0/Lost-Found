import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';
import { IUserLogic } from '../interfaces/logic/IUserLogic';
import { IUserDAL } from '../interfaces/IUserDAL';

export class UserLogic implements IUserLogic {
  userDAL: IUserDAL;

  constructor(userDAL: IUserDAL) {
    this.userDAL = userDAL;
  }

  async register(username: string, email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await this.userDAL.getUserByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    await this.userDAL.createUser(username, email, hashedPassword);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userDAL.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1800s' });
    }

    return null;
  }
}
