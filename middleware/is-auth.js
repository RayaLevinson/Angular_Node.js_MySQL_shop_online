const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse'); 
const User = require('../models/User');
const { 
  NOT_AUTHENTICATED, 
  FORBIDDEN } = require('../constValues/httpStatusCodes');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  if (req.session && req.session.user) {
    // Retest to be sure that user was not deleted from the database till now.
    const user = await User.findById(req.session.user._id);
    if (user) {
      return next();
    }
  } 
  return next(new ErrorResponse('Not authorized to access this route', NOT_AUTHENTICATED));   
});

// Grant access to specific roles
// Usage: like protect, but authorize('admin', 'superadmin'). Be sure to put it after protect middleware.
// Example: 
//    router.get('/', protect, authorize('admin', 'superadmin'), accountController.getAccount);
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      if (!roles.includes(req.session.user.role)) {
        return next(new ErrorResponse(`User role ${req.user.role} is not authorized this route`, FORBIDDEN));
      }
    }
    next();
  }
}
