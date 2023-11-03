// routes/postRoutes.ts
import express, { Router, Request, Response } from 'express';
import { createPost, getAllPosts } from '../controllers/postController';
import authenticateToken from '../middleware/authentication'; // Corrected path

const router: Router = express.Router();

// Define routes for the Post entity
router.post('/create', authenticateToken, createPost as (req: Request, res: Response) => Promise<void>);
router.get('/', authenticateToken, getAllPosts as (req: Request, res: Response) => Promise<void>);

export default router;
