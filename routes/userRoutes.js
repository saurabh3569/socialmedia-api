const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { signup, authenticate, follow, unfollow, profile } = require('../controllers/userControllers');
const { checkValidation, validate } = require('../middleware/validator');

// authenticate user
router.post('/authenticate', [
    validate('email'),
    validate('password')
], checkValidation, authenticate);

// follow a user
router.post('/follow/:id', protect, follow);

// unfollow a user
router.post('/unfollow/:id', protect, unfollow);

// get current user profile
router.get('/user', protect, profile);

module.exports = router

