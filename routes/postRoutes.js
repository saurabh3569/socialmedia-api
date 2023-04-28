const express = require('express');
const router = express.Router()

const protect = require('../middleware/authMiddleware');
const { newPost, deletePost, likePost, unlikePost, commentPost, getSinglePost, getAllPost } = require('../controllers/postControllers');
const { validate, checkValidation } = require('../middleware/validator');

// create a post
router.post('/posts', [
    validate('title'),
    validate('description')
], checkValidation, protect, newPost);

// delete a post by id
router.delete('/posts/:id', protect, deletePost);

// like post
router.post('/like/:id', protect, likePost);

// unlike post
router.post('/unlike/:id', protect, unlikePost);

// comment on a post
router.post('/comment/:id', [
    validate('comment')
], checkValidation, protect, commentPost);

// get single post by id
router.get('/posts/:id', protect, getSinglePost);

// get all post of a user
router.get('/all_posts', protect, getAllPost);

module.exports = router

