// controllers/postController.js
const { Posts } = require('../models'); // Import the Post model

// Controller functions
const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll(); // Retrieve all posts from the database
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
    const newPost = await Posts.create({
      userId: 1,
      title: "testItem",
      description: "goodArchitecture",
      latitude,
      longitude,
      tags: "dsda",
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