import { IPostLogic } from '../interfaces/logic/IPostLogic';
import { IPostDAL } from '../interfaces/IPostDAL';
import { Post } from 'models/post';

export class PostLogic implements IPostLogic{
  postDAL: IPostDAL;

  constructor(postDAL: IPostDAL) {
    this.postDAL = postDAL;
  }
  
  getPosts = async (userId: number) => {
    try {
      return this.postDAL.getPosts(userId);
    } catch (error) {
      throw error;
    }
  }

  createPost = async(postData: Post) => {
    
    try {
      return this.postDAL.createPost(postData);
    } catch (error) {
      throw error;
    }
  }
}
