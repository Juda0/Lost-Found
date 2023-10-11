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
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createPost = async (req, res) => {
  try {
    // Extract post data from the request body
    const { userId, title, description, latitude, longitude, tags } = req.body;

    // Create a new post in the database
    const newPost = await Post.create({
      userId: 1,
      title: "testItem",
      description: "goodArchitecture",
      latitude,
      longitude,
      tags: "dsda",
      userId: 1,
    });

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  // Add more controller functions as needed
};