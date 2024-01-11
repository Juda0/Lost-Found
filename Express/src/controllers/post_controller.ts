// controllers/postController.ts
import { Request, Response } from 'express';
import { IAuthenticatedRequest } from '../interfaces/middleware/IAuthenticatedRequest'
import { IPostLogic } from '../interfaces/logic/IPostLogic';
import { Post } from 'models/post';
import { FileLogic } from '../logic/FileLogic';

export class PostController {
  postLogic: IPostLogic;
  fileLogic: FileLogic;

  constructor(postLogic: IPostLogic) {
    this.postLogic = postLogic;
    this.fileLogic = new FileLogic();
  }

  getAllPostsWithFilters = async (req: Request, res: Response): Promise<void> => {
    try {
      const search = req.query['search'] as string || '';
      const posts = await this.postLogic.getAllPostsWithFilters(search);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }
  
  validatePostData = (postData: Post) => {
    // Check if title, description, and userId are not empty
    if (!postData.title || !postData.description || !postData.userId) {
      throw new Error('Title, description, and a valid user must be provided');
    }
  }

  getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
  
      const postId: number = parseInt(req.params['id'] as string); // Use parseInt to convert the string to a number
      if (isNaN(postId)) {
        res.status(400).json({ error: 'Invalid post ID', message: 'This post id is not valid' });
        return;
      }
      
      const post = await this.postLogic.getPostById(postId);
      if (post === null) {
        res.status(404).json({ error: 'Post not found', message: 'Post not found' });
        return;
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch post', message: 'Failed to fetch post' });
    }
  }

  getPostsWithFilters = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId; // Use optional chaining here
      if (userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }
  
      const page = parseInt(req.query['page'] as string) || 1;
      const search = req.query['search'] as string || '';
      const posts = await this.postLogic.getPostsWithFilters(userId, page, search);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  createPost = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Check if user id is set
      if (req.user?.userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      // Create post data
      const postData: Post = {
        title: req.body.title,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        tags: req.body.tags,
        userId: req.user?.userId as number || 0,
      };

      // Call create post method in logic
      const newPost = await this.postLogic.createPost(postData, req.file);


      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create your post on the server', message: error.message });
      } else {
        // Handle any other types of errors here
        console.error(error);
        res.status(500).json({ error: 'Failed to create your post on the server' });
      }
    }
  }
}
  