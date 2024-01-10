// routes/postRoutes.ts
import express, { Router, Request, Response } from 'express';
import authenticateToken from '../middleware/authentication';
import { PostController } from '../controllers/post_controller';
import { PostLogic } from '../logic/post_logic';
import { PostDAL } from '../dal/post_dal';
import { IAuthenticatedRequest } from '../interfaces/middleware/IAuthenticatedRequest';
import multer from 'multer'

// Set up Multer to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage for simplicity; adjust as needed
const upload = multer({ storage: storage });

const router: Router = express.Router();
const postDAL = new PostDAL();
const postLogic = new PostLogic(postDAL);
const postController = new PostController(postLogic);

// Protected route: Create a new post
router.post('/create', authenticateToken,  upload.single('image'), async (req: IAuthenticatedRequest, res: Response) => {
  // Access form data, including files, using req.file and req.body
  console.log('Received FormData:', req.body);
  console.log('Received File:', req.file);
  
  await postController.createPost(req, res);
});

// Protected route: Get post by id
router.get('/view/:id', authenticateToken, async (req: Request, res: Response) => {
  await postController.getPostById(req, res);
});

// Protected route: Get all posts
router.get('/', authenticateToken, async (req: IAuthenticatedRequest, res: Response) => {
  await postController.getAllPosts(req, res);
});

export default router;
