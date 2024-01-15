import express, { Router, Request, Response } from 'express';
import { DatabaseController } from '../controllers/database_controller';
import { DatabaseDAL } from '../dal/database_dal';
import { DatabaseLogic } from '../logic/database_logic';
import { UserDAL } from '../dal/user_dal';
import { UserLogic } from '../logic/user_logic';
import { UserController } from '../controllers/user_controller';


const router: Router = express.Router();


const databaseDAL = new DatabaseDAL();
const databaseLogic = new DatabaseLogic(databaseDAL);
const databaseController = new DatabaseController(databaseLogic);


const userDAL = new UserDAL();
const userLogic = new UserLogic(userDAL);
const userController = new UserController(userLogic);

router.get('/reset', async (_, res: Response) => {
  await databaseController.reset(res);
});

router.post('/seed', async (req: Request, res: Response) => {
  await userController.register(req, res);
});

export default router;
