const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');
const Order = require('../../models/Order');
const asyncHandler = require('../../middleware/async');
const { OK } = require('../../constValues/httpStatusCodes');

//@route    GET /api/shopping/cart
//@desc     Get cart for user
//@access   Private/User
exports.getCart = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;

  let cartId;
  const result = await Cart.findOne(userId);
  if (result.length === 0) {
    cartId = await Cart.create(userId);
  } else {
    cartId = result[0].id;
  }

  req.session.cartId = cartId;
  
  const cartItems = await CartItem.findAll(cartId);

  return res.status(OK).json({ success: true, data: cartItems });  
});

//@route    GET /api/shopping/cart/status
//@desc     Get shopping status for user
//@access   Private/User
exports.getShoppingStatus= asyncHandler(async (req, res, next) => {
  const shoppingStatus = {    
    isNewUser: undefined,
    currentCart: {
      createdAt: undefined
    },
    lastOrder: {
      createdAt: undefined
    }
  };

  const userId = req.session.user.id;
  const cartId = req.session.cartId;

  const cartItems = await CartItem.findAll(cartId);
  if (cartItems.length > 0) { // There is an open cart with items
    shoppingStatus.isNewUser = false;
    const result = await Cart.findOne(userId);
    shoppingStatus.currentCart.createdAt = result[0].createdAt; 
    shoppingStatus.lastOrder = undefined;

    return res.status(OK).json({ success: true, data: shoppingStatus });  
  } else { // Get lastest order
    const result = await Order.getLatestOrder(userId);
    if (result.length === 0) {
      shoppingStatus.isNewUser = true;
      return res.status(OK).json({ success: true, data: shoppingStatus });
    } else {
      shoppingStatus.lastOrder.createdAt = result[0].createdAt;
    }
  }

  return res.status(OK).json({ success: true, data: shoppingStatus });  
});
