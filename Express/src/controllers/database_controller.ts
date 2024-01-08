// controllers/postController.ts
import { Response } from 'express';
import { resetDatabase } from '../config/resetDb'
import { seedDatabase } from '../config/seedDb'

export class DatabaseController {

        reset = async (res: Response): Promise<void> => {
            try {
                // Your code to reset the database
                await resetDatabase();
                res.status(200).json({ message: 'Database reset successful.' });
                }
             catch (error) {
                console.error('Error resetting database:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
          }    
          
          seed = async (res: Response): Promise<void> => {
            try {
                // Your code to reset the database
                await seedDatabase();
                res.status(200).json({ message: 'Database seeded successfully.' });
                }
             catch (error) {
                console.error('Error resetting database:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
          }    
}

