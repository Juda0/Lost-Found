const postDAL = require('../dal/postDAL');

// Controller functions
const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.userId;
    const posts = await postDAL.getPosts(userId);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

const createPost = async (req, res) => {
  try {
    // Post object
    const post = {
      title: "testItem",
      description: "goodArchitecture",
      latitude: "",
      longitude: "",
      tags: "dsda",
      userId: req.user.userId
    };
    
    const newPost = await postDAL.createPost(post); // Fix the createPost call
    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
};