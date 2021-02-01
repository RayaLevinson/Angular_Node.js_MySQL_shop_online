const path = require('path');
const config = require('config');
const Order = require('../../models/Order');
const Cart = require('../../models/Cart');
const CartItem = require('../../models/CartItem');
const ErrorResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');
const fileHelper = require('../../utils/fileHelper');
const { isOrderValid } = require('../../utils/validation/orderValidation');
const { OK, CREATED, FORBIDDEN, BAD_REQUEST } = require('../../constValues/httpStatusCodes');

const UPLOADS_DIR = '.' + path.sep + config.get('uploadsFolder');

//@route    POST /api/orders
//@desc     Add a new order
//@access   Private/User
exports.saveOrder = asyncHandler(async (req, res, next) => {
  const errors = [];
  if (!isOrderValid(req.body, errors)) {
    return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
  }

  const userId = req.session.user.id;
  const cartId = req.session.cartId;

  if (userId && cartId) {
    const {totalPrice, city, street, house, apartment, dateToShip, creditCardPartialDigits } = req.body;  

    // Credit card partual digits are saved in database according to the requirements
    const order = { 
      totalPrice, userId, cartId, city, street, house, apartment, 
      dateToShip, creditCardPartialDigits: creditCardPartialDigits
    }

    const orderId = await Order.create(order);

    await Cart.closeCart(cartId);

    const cartItems = await CartItem.findAll(cartId);

    const orderForFile = {
      totalPrice: order.totalPrice,
      cartItems
    };

    const fileLocation = '.' + path.sep + createOrderFile(orderId, orderForFile);

    res.status(CREATED).json({ success: true, data: { orderSummaryFileLocation: fileLocation } });
  } else {
    res.status(BAD_REQUEST).json({ success: false });
  }   
});

//@route    GET /api/orders/totalNumber
//@desc     Get number of orders
//@access   Private/User
exports.getTotalNumOfOrders = asyncHandler(async (req, res, next) => {
  const numberOfOrders = await Order.getTotalNumberOfOrders();

  res.status(OK).json({ success: true, data: { numberOfOrders: numberOfOrders } });
});

//@route    GET /api/orders/number/?date=date
//@desc     Check whether order is available on specific date
//@access   Public
exports.isShippingAvailable = asyncHandler(async (req, res, next) => {
  const date = req.query.date;
  // Validate: not null

  const numberOfOrders = await Order.getNumberOfOrders(date);

  if (numberOfOrders > 3) { 
    return res.status(FORBIDDEN).json({success: true, available: false });
  }

  return res.status(OK).json({ success: true, available: true });
});

function createOrderFile(orderId, order) {
  const fileLocation = path.join(UPLOADS_DIR, `order_${orderId}.txt`)

  fileHelper.createFile(fileLocation, order);

  return fileLocation;
}
