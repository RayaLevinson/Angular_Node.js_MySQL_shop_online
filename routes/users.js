const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

//@route    POST /api/users
//@desc     Create a new user
//@acceess  Public
router.post('/', usersController.registerUser);

module.exports = router;
