const express = require('express');
const orderController = require('../../controllers/shopping/order');
const { protect } = require('../../middleware/is-auth');

const router = express.Router();

//@route    GET /api/orders/totalNumber
//@desc     Get total number of orders
//@access   Public
router.get('/totalNumber', orderController.getTotalNumOfOrders);

//@route    GET /api/orders/shippingAvailable/?date=date
//@desc     Check whether order is available on specific date
//@access   Public
router.get('/shippingAvailable', orderController.isShippingAvailable);

//@route    POST /api/orders
//@desc     Add a new order
//@access   Private/User
router.post('/', protect, orderController.saveOrder);

module.exports = router;

