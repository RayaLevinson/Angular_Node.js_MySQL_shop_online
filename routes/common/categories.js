const express = require('express');
const categoriesController = require('../../controllers/common/categories');

const router = express.Router();

//@route    GET /api/categories
//@desc     Get products categories
//@access   Public
router.get('/', categoriesController.getCategories);

module.exports = router;