import express, { Router } from 'express';
import { UserController } from '../controllers/user_controller';
import { UserLogic } from '../logic/user_logic';
import { UserDAL } from '../dal/user_dal';

const router: Router = express.Router();

const userDAL = new UserDAL();
const userLogic = new UserLogic(userDAL);
const userController = new UserController(userLogic);

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
