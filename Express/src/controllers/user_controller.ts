import { Request, Response } from 'express';
import { IUserLogic } from '../interfaces/logic/IUserLogic';
import { HttpResponse } from '../httpResponses/http_response';
import { User } from '../models/user';
import { PublicUser } from '../models/public_user';

export class UserController {
  logic: IUserLogic;

  constructor(logic: IUserLogic) {
    this.logic = logic;
  }

  // Register a new user
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, email, password } = req.body;
      const user: User = await this.logic.register(username, email, password);

      // Create a client-safe user object
      const publicUser: PublicUser = { id: user.id, username: user.username, email: user.email };

      res.status(201).json(HttpResponse.success(publicUser, 'User added succesfully.'));
    } catch (error) {
      console.error('Error in UserController.register:', error);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }

  // User login
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const token = await this.logic.login(email, password);

      if (token) {
        res.status(200).json({ message: 'Successfully logged in', token });
      } else {
        res.status(404).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error in UserController.login:', error);
      res.status(500).json({ error: 'Failed to log in' });
    }
  }
}
