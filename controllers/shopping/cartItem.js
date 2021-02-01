const CartItem = require('../../models/CartItem');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');
const { isCartItemValid } = require('../../utils/validation/cartItemValidation');
const { OK, BAD_REQUEST } = require('../../constValues/httpStatusCodes');

//@route    POST /api/shopping/cartItem 
//@desc     Create or update a cart item
//@access   Private/User
exports.createOrUpdateCartItem = asyncHandler(async (req, res, next) => {
  const errors = [];
  const cartId = req.session.cartId;
  
  if (cartId) {     
    if (!isCartItemValid(req.body, errors)) {
      return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
    }

    const { productId, quantity, itemPrice } = req.body;
          
    let cartItem = { productId, quantity, itemPrice, cartId };  
    cartItem = await CartItem.update(cartItem);

    return res.status(OK).json({ success: true, data: cartItem });
  } 
  return res.status(BAD_REQUEST).json({ success: false });
});

//@route    DELETE /api/shopping/cartItem/:id 
//@desc     Delete cart item by id
//@access   Private/User
exports.deleteCartItem = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const cartId = req.session.cartId;

  if (!cartId || isNaN(id)) {  
    return res.status(BAD_REQUEST).json({ success: false });
  } else {
    await CartItem.delete(id);
    
    return res.status(OK).json({ success: true, data: {} });
  }
});