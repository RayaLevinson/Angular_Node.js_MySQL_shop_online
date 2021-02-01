const express = require('express');
const productsController = require('../../controllers/shopping/cart');
const { protect } = require('../../middleware/is-auth');

const router = express.Router();

//@route    GET /api/shopping/cart
//@desc     Get cart for user
//@access   Private/User
router.get('/', protect, productsController.getCart);

//@route    GET /api/shopping/cart/status
//@desc     Get shopping status for user
//@access   Private/User
router.get('/status', protect, productsController.getShoppingStatus);

module.exports = router;

