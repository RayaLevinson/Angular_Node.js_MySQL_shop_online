const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { isLoginInputValid } = require ('../utils/validation/userValidation');

const { 
  OK,
  BAD_REQUEST,
  NOT_AUTHENTICATED,
  FORBIDDEN,
  SERVER_ERROR 
} = require('../constValues/httpStatusCodes');

// @route   POST /api/users/auth/login
// @desc    Handle user login, auth user
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  const errors = [];
  if (! isLoginInputValid(req.body, errors)) {
    return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
  } 

  // Check for user
  const response = await User.findOneByEmail(email);

  if (response.length === 0) {
      return next(new ErrorResponse('Invalid credentials', NOT_AUTHENTICATED)); 
  }

  const user = response[0];

  const isMatch = await bcrypt.compare(password, user.password);
      
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', NOT_AUTHENTICATED)); 
  }

  sanitizedUser = {
    id: user.id,
    firstName: user.firstName, 
    lastName: user.lastName, 
    email: user.email,     
    role: user.role,
    city: user.city, 
    street: user.street, 
    house: user.house, 
    apartment: user.apartment
  }

  req.session.user = sanitizedUser;

  res.status(OK).json({success: true, data: sanitizedUser});
});

// @route   GET /api/users/auth/logout
// @desc    Log user out and clear session
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(new ErrorResponse('Problem to destroy session', SERVER_ERROR));
      } else {
          req.session = null;
          res.status(OK).json({success: true, data: {}});
      }
    });
  }
});

// @route   GET /api/users/auth/current
// @desc    Get current logged in user
// @access  Private
exports.getCurrent = asyncHandler(async (req, res, next) => {
  if (req.session && req.session.user) {

    return res.status(OK).json({success: true, data: req.session.user });
    
  } 
  return next(new ErrorResponse('Not authorized to access this resource', NOT_AUTHENTICATED));   
});

// @route   GET /api/users/auth/username/:username
// @desc    Checks whether username is available or taken
// @access  Public
exports.username = asyncHandler(async (req, res, next) => {
  const username = req.params.username;

  // Check for username
  const result = await User.findOneByEmail(username);

  if (result.length > 0) { 
    return res.status(FORBIDDEN).json({success: true, available: false });
  }
  return res.status(OK).json({success: true, available: true });
});

// @route   GET /api/users/auth/id/:id
// @desc    Checks whether id is available or already was registered
// @access  Public
exports.id = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  // Check for id
  const result = await User.findById(id);

  if (result.length > 0) { 
    return res.status(FORBIDDEN).json({success: true, available: false });
  }
  return res.status(OK).json({success: true, available: true });
});