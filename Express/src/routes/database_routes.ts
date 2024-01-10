import express, { Router } from 'express';
import { DatabaseController } from 'controllers/database_controller';


const router: Router = express.Router();

const databaseController = new DatabaseController();

router.get('/reset', databaseController.reset);
router.get('/seed', databaseController.seed);

export default router;
