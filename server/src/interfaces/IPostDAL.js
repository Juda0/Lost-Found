class IPostDAL {
  async getPosts(userId) {
    throw new Error('Method not implemented');
  }

  async createPost(post) {
    throw new Error('Method not implemented');
  }
}

module.exports = IPostDAL;
