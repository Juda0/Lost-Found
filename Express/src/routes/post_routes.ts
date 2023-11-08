import express, { Router, Request, Response } from 'express';
import authenticateToken from '../middleware/authentication';
import { PostController } from '../controllers/post_controller';
import { PostLogic } from '../logic/post_logic';
import { PostDAL } from '../dal/post_dal';
import { IAuthenticatedRequest } from '../interfaces/IAuthenticatedRequest';

const router: Router = express.Router();

const postDAL = new PostDAL();
const postLogic = new PostLogic(postDAL);
const postController = new PostController(postLogic);

router.post('/register', authenticateToken, (req: IAuthenticatedRequest, res: Response) => postController.createPost(req, res));
router.post('/login', authenticateToken, (req: IAuthenticatedRequest, res: Response) => postController.getAllPosts(req, res));




export default router;

