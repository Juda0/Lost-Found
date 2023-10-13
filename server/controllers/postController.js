// controllers/postController.js
const { Post } = require('../models');

// Controller functions
const getAllPosts = async (req, res) => {
  try {
    const userId = req.user.userId; // get userId that is set in middleware

    const posts = await Post.findAll({
      where: { userId }, // Filter posts with matching userId
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (req, res) => {
  try {
    // Create a new post in the database
    const newPost = await Post.create({
      title: "testItem",
      description: "goodArchitecture",
      latitude: "",
      longitude: "",
      tags: "dsda",
      userId: req.user.userId,
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
    getAllPosts()
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
};