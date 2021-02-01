const Category = require('../../models/Category');
const asyncHandler = require('../../middleware/async');

const { OK } = require('../../constValues/httpStatusCodes');

//@route    GET /api/categories
//@desc     Get products categories
//@access   Public
exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll();

  res.status(OK).json({ success: true, data: categories });
});