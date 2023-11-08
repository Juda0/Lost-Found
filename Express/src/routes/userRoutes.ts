import express, { Router } from 'express';
import { UserController } from '../controllers/userController'

const userController = new UserController(); // Create an instance of the UserController

const router: Router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

export default router;
