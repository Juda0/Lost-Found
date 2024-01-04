export interface IPostLogic {
  getPosts(userId: number): Promise<any>;
  createPost(postData: any,file: Express.Multer.File | undefined): Promise<any>;
}
