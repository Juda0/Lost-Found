export interface IPostDAL {
  getPostById(postId: number): Promise<any>;
  getAllPostsWithFilters(search: string): Promise<any>;
  createPost(post: any): Promise<any>;
  getPostsWithFilters(userId: number, skipRecords: number, search: string) : Promise<any>; 
}