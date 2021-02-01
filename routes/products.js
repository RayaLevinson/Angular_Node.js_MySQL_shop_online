const express = require('express');
const productsController = require('../controllers/products');
const { protect, authorize } = require('../middleware/is-auth');
const router = express.Router();

//@route    GET /api/products/?category=categoryId OR GET /api/products/?product=productName
//@desc     Get products by query
//@access   Private/User or Private/Admin
router.get('/', protect, productsController.getProductsByQuery);

//@route    POST /api/products
//@desc     Add a products
//@access   Private/Admin
router.post('/', protect, authorize('admin'), productsController.addProduct);

//@route    PUT /api/products/:id
//@desc     Update product
//@access   Private/Admin
router.put('/:id', protect, authorize('admin'), productsController.updateProduct);

//@route    GET /api/products/totalNumber
//@desc     Get total number of products
//@access   Public
router.get('/totalNumber', productsController.getNumberOfProducts);

module.exports = router;