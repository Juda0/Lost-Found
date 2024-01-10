export interface IPostDAL {
  getPostById(postId: number): Promise<any>;
  getPosts(userId: number): Promise<any>;
  createPost(post: any): Promise<any>;
}