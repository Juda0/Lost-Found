export interface IPostLogic {
  getPostById(postId: number): Promise<any>;
  getPosts(userId: number): Promise<any>;
  createPost(postData: any,file: Express.Multer.File | undefined): Promise<any>;
}
