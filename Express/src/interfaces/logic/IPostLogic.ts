export interface IPostLogic {
  getPosts(userId: number): Promise<any>;
  createPost(postData: any): Promise<any>;
}
