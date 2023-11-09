// routes/postRoutes.ts
import express, { Router, Request, Response } from 'express';
import authenticateToken from '../middleware/authentication';
import { PostController } from '../controllers/post_controller';
import { PostLogic } from '../logic/post_logic';
import { PostDAL } from '../dal/post_dal';
import { IAuthenticatedRequest } from '../interfaces/middleware/IAuthenticatedRequest';

const router: Router = express.Router();
const postDAL = new PostDAL();
const postLogic = new PostLogic(postDAL);
const postController = new PostController(postLogic);

// Protected route: Create a new post
router.post('/create', authenticateToken, async (req: IAuthenticatedRequest, res: Response) => {
  await postController.createPost(req, res);
});

// Protected route: Get all posts
router.get('/', authenticateToken, async (req: IAuthenticatedRequest, res: Response) => {
  await postController.getAllPosts(req, res);
});

export default router;
