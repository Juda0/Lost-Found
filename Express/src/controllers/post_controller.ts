// controllers/postController.ts
import { Request, Response } from 'express';
import { IAuthenticatedRequest } from '../interfaces/IAuthenticatedRequest'
import { IPostLogic } from '../interfaces/logic/IPostLogic';

export class PostController {
  postLogic: IPostLogic;

  constructor(postLogic: IPostLogic) {
    this.postLogic = postLogic;
  }

  getAllPosts = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user.userId;
      const posts = await this.postLogic.getPosts(userId);
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }

  createPost = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Post object
      const post = {
        title: 'testItem',
        description: 'goodArchitecture',
        latitude: null,
        longitude: null,
        tags: 'dsda',
        userId: req.user.userId,
      };

      const newPost = await this.postLogic.createPost(post);
      res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a post' });
    }
  }
}
