const express = require('express');
const citiesController = require('../controllers/cities');

const router = express.Router();

//@route    GET /api/cities
//@desc     Get cities
//@access   Public
router.get('/', citiesController.getCities);

module.exports = router;

