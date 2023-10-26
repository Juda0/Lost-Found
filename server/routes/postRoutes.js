const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const testController = require('../controllers/testController');
const authenticateToken = require('../middlewares/authentication');

// Define routes for the Post entity
router.post('/create', authenticateToken, testController.createPost);
router.get('/', authenticateToken, testController.getAllPosts);

module.exports = router;