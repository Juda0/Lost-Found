export interface IPostLogic {
  getPostById(postId: number): Promise<any>;
  getAllPostsWithFilters(search: string): Promise<any>;
  createPost(postData: any,file: Express.Multer.File | undefined): Promise<any>;
  getPostsWithFilters(userId: number, page: number, search: string) : Promise<any>;
}
