// controllers/databaseController.ts

import { Response} from 'express';
import { IDatabaseLogic } from '../interfaces/logic/IDatabaseLogic';

export class DatabaseController {
  private databaseLogic: IDatabaseLogic;

  constructor(databaseLogic: IDatabaseLogic) {
    this.databaseLogic = databaseLogic;
  }

  reset = async (res: Response): Promise<void> => {
    try {
      console.log("Resetting database from controller");
      // Your code to reset the database
      await this.databaseLogic.resetDatabase();
      res.status(200).json({ message: 'Database reset successful.' });
    } catch (error) {
      console.error('Error resetting database from controller:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
