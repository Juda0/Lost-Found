const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// Define routes for the Post entity
router.get('/create', postController.createPost);
// Define more routes as needed

module.exports = router;