import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';
import { UserDAL, IUserDAL } from '../dal/UserDAL';

// Logic Interface
export interface IUserLogic {
    register(username: string, email: string, password: string): Promise<void>;
    login(email: string, password: string): Promise<string | null>;
}

export class UserLogic implements IUserLogic {
  userDAL:IUserDAL;
    constructor() {
        this.userDAL = new UserDAL();
    }

  async register(username: string, email: string, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await this.userDAL.findUserByEmail(email);

    if (userExists) {
      throw new Error('User already exists');
    }

    await this.userDAL.createUser(username, email, hashedPassword);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userDAL.findUserByEmail(email);

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
