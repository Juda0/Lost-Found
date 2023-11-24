import express, { Router } from 'express';
import { UserController } from '../controllers/user_controller';
import { UserLogic } from '../logic/user_logic';
import { UserDAL } from '../dal/user_dal';
import { PrismaClient } from '@prisma/client/edge';


const router: Router = express.Router();

const userDAL = new UserDAL(new PrismaClient());
const userLogic = new UserLogic(userDAL);
const userController = new UserController(userLogic);

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
