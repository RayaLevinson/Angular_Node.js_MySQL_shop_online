const cities = require('../data/cities/cities.json');
const { OK } = require('../constValues/httpStatusCodes');

//@route    GET /api/cities
//@desc     Get cities
//@access   Public
exports.getCities = (req, res, next) => {
  res.status(OK).json({ success: true, data: cities }); 
};
