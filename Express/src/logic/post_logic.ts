import { IPostLogic } from '../interfaces/logic/IPostLogic';
import { IPostDAL } from '../interfaces/IPostDAL';

export class PostLogic implements IPostLogic{
  postDAL: IPostDAL;

  constructor(postDAL: IPostDAL) {
    this.postDAL = postDAL;
  }

  async getPosts(userId: number) {
    try {
      return this.postDAL.getPosts(userId);
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData: any) {
    try {
      return this.postDAL.createPost(postData);
    } catch (error) {
      throw error;
    }
  }
}
