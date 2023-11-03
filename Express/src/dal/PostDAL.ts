import { Sequelize, Model, ModelStatic, ModelCtor } from 'sequelize';
import IPostDAL from '../interfaces/IPostDAL';

class PostDAL extends IPostDAL {
  private PostModel: ModelStatic<Model>;

  constructor(postModel: ModelCtor<Model>) {
    super();
    this.PostModel = postModel;
  }

  async getPosts(userId: number) {
    try {
      const posts = await this.PostModel.findAll({
        where: { userId },
      });
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async createPost(postData: any) {
    try {
      const newPost = await this.PostModel.create(postData);
      return newPost;
    } catch (error) {
      throw error;
    }
  }
}

export default PostDAL;
