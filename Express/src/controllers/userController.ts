import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';
import { IUserLogic, UserLogic } from '../logic/UserLogic'

export class UserController {
  logic: IUserLogic;
  
  constructor() {
    this.logic = new UserLogic(); 
  }

  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      await this.logic.register(username, email, password);
      res.status(201).json({ message: 'User successfully registered' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to register' });
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.logic.login(email, password);

      if (token) {
        res.status(200).json({ message: 'Successfully logged in', token });
      } else {
        res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to login' });
    }
  }
}
