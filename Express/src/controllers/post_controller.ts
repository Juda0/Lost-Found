// controllers/postController.ts
import { Response } from 'express';
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

  getAllPosts = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const userId = req.user?.userId; // Use optional chaining here
      if (userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }
  
      const posts = await this.postLogic.getPosts(userId);
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

  createPost = async (req: IAuthenticatedRequest, res: Response): Promise<void> => {
    try {
      // Check if user id is set
      if (req.user?.userId === undefined) {
        res.status(401).json({ error: 'Unauthorized', message: 'User not authenticated' });
        return;
      }

      // Convert req body to post model
      const postData: Post = req.body;

      // Insert userId into postData
      // This is required because the ID is in a separate user object
      postData.userId = req.user?.userId as number;

      // Validate postData
      this.validatePostData(postData);

      // Handle file upload
      if (req.file) {
        const filePath = await this.fileLogic.saveFile(req.file);
        postData.imagePath = filePath;
      }

      // Call create post method in logic
      const newPost = await this.postLogic.createPost(postData);

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
  