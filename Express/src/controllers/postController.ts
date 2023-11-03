// controllers/postController.ts
import { Request, Response } from 'express';
import PostDAL from '../dal/PostDAL';
import { Post } from '../models/Post';

const postDAL = new PostDAL(Post);

interface AuthenticatedRequest extends Request {
  user: { userId: number };
}

export async function getAllPosts(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user.userId;
    const posts = await postDAL.getPosts(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
}

export async function createPost(req: AuthenticatedRequest, res: Response): Promise<void> {
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

    const newPost = await postDAL.createPost(post);
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create a post' });
  }
}
