const { Post } = require('../models');
const IPostDAL = require('../interfaces/IPostDAL');

class PostDAL extends IPostDAL {
    getPosts = async (userId) => {
    try {
        return await Post.findAll({
        where: { userId },
        });
    } catch (error) {
        throw error; // You should throw the error to propagate it to the caller
    }
    };

    createPost = async (post) => {
    try {
        const newPost = await Post.create(post); // Create the post directly
        return newPost;
    } catch (error) {
        throw error;
    }
    }
}

module.exports = new PostDAL();