const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authenticateToken = require('../middlewares/authentication');

// Define routes for the Post entity
router.get('/create', postController.createPost);
router.get('/', authenticateToken, postController.getAllPosts);

module.exports = router;