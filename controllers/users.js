const bcrypt = require('bcrypt');
const User = require('../models/User');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const { isRegistrationInputValid } = require ('../utils/validation/userValidation');

const { 
  CREATED,
  BAD_REQUEST
} = require('../constValues/httpStatusCodes');

//@route    POST /api/users
//@desc     Create a new user
//@acceess  Public
exports.registerUser = asyncHandler(async (req, res, next) => {
  const { id, firstName, lastName, email, password, confirmPassword, role, city, street, house, apartment } = req.body;

  // Validate input
  const errors = [];
  if (! isRegistrationInputValid(req.body, errors)) {
    return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
  } 

  let result = await User.findOneByEmail(email);
  if (result.length > 0) { 
    return next(new ErrorResponse('Email was already registered.', BAD_REQUEST));
  }

  result = await User.findById(id);
  if (result.length > 0) { 
    return next(new ErrorResponse('Id was already registered.', BAD_REQUEST));
  }

  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(password, salt);

  result = await User.create({
    id,
    firstName, 
    lastName, 
    email, 
    encryptedPassword,
    role,
    city, 
    street, 
    house, 
    apartment
  });

  if(result.affectedRows === 1) {
    const result = await User.findById(id);
    const user = result[0];

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
    
    res.status(CREATED).json({success: true, data: sanitizedUser});
  }
});


