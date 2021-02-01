const express = require('express');
const authController = require('../controllers/auth');
const { protect } = require('../middleware/is-auth');

const router = express.Router();

// @route   POST /api/users/auth/login
// @desc    Handle login, auth user
// @access  Public
router.post('/login', authController.login);

// @route   GET /api/users/auth/logout
// @desc    Log user out and clear session
// @access  Public
router.get('/logout', authController.logout);

// @route   GET /api/users/auth/current
// @desc    Get current logged in user
// @access  Private
router.get('/current', protect, authController.getCurrent);

// @route   GET /api/users/auth/username/:username
// @desc    Checks whether username is available or taken
// @access  Public
router.get('/username/:username', authController.username);

// @route   GET /api/users/auth/id/:id
// @desc    Checks whether id is available or already was registered
// @access  Public
router.get('/id/:id', authController.id);

module.exports = router;