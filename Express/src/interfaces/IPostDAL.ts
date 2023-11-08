export interface IPostDAL {
  getPosts(userId: number): Promise<any>;
  createPost(post: any): Promise<any>;
}