const express = require('express');
const cartItemController = require('../../controllers/shopping/cartItem');
const { protect } = require('../../middleware/is-auth');

const router = express.Router();

//@route    POST /api/shopping/cartItem 
//@desc     Create or update a cart item
//@access   Private/User
router.post('/', protect, cartItemController.createOrUpdateCartItem);

//@route    DELETE /api/shopping/cartItem/:id 
//@desc     Delete cart item by id
//@access   Private/User
router.delete('/:id', protect, cartItemController.deleteCartItem);

module.exports = router;
