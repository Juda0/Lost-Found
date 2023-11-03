class IPostDAL {
  async getPosts(userId: number): Promise<any> {
    throw new Error('Method not implemented');
  }

  async createPost(post: any): Promise<any> {
    throw new Error('Method not implemented');
  }
}

export default IPostDAL;
