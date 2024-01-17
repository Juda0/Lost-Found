export interface IPostDAL {
  getPostById(postId: number): Promise<any>;
  getAllPostsWithFilters(search: string): Promise<any>;
  createPost(post: any): Promise<any>;
  deletePost(postId: number, userId:number): Promise<any>;
  getPostsWithFilters(userId: number, skipRecords: number, search: string) : Promise<any>; 
}