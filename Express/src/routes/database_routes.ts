import express, { Router } from 'express';
import { DatabaseController } from '../controllers/database_controller';
import { DatabaseDAL } from '../dal/database_dal';
import { DatabaseLogic } from '../logic/database_logic';


const router: Router = express.Router();


const databaseDAL = new DatabaseDAL();
const databaseLogic = new DatabaseLogic(databaseDAL);
const databaseController = new DatabaseController(databaseLogic);

router.get('/reset', databaseController.reset);
router.get('/seed', databaseController.seed);

export default router;
