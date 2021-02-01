const path  = require('path');
const Product = require('../models/Product');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const fileHelper = require('../utils/fileHelper');
const { isProductExceptImageValid, isImageValid, isProductIdValid } = require('../utils/validation/productValidation');
const { OK, CREATED, BAD_REQUEST } = require('../constValues/httpStatusCodes');

//@route    GET /api/products/?category=categoryId OR GET /api/products/?product=productName
//@desc     Get products by query
//@access   Private/User or Private/Admin
exports.getProductsByQuery = asyncHandler(async (req, res, next) => {
  const categoryId = req.query.category;

  if (categoryId) {
    if (isNaN(Number(categoryId))) {
      return next(new ErrorResponse('Category is not valid', BAD_REQUEST));
    }
    const products = await Product.findByCategory(categoryId);
    
    res.status(OK).json({ success: true, data: products }); 
  } else {
    const productName = req.query.product;

    if (!productName) {
      return next(new ErrorResponse('Product name is not valid', BAD_REQUEST));
    }

    const products = await Product.findByProductName(productName);
    
    res.status(OK).json({ success: true, data: products }); 
  }
});

//@route    POST /api/products
//@desc     Add a products
//@access   Private/Admin
/* 
For Product creation and update: 
In Postman select body --> form-data ->
Key: name, value: 'My New Product'
...
Key: image --> (set type: file). Value: select some file
 */
exports.addProduct = asyncHandler(async (req, res, next) => {
  const errors = [];
  if (!isProductExceptImageValid(req.body, errors) || (!isImageValid(req.file, errors))) {
    return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
  }

  let { name, price, categoryId } = req.body;

  const image = req.file;
  const imagePath = '.' + path.sep + image.path;

  const product = { name, price, imagePath, categoryId }
  const result = await Product.create(product);
  product.id = result.insertId;
  res.status(CREATED).json({ success: true, data: product });  
});

//@route    PUT /api/products/:id
//@desc     Update product
//@access   Private/Admin
exports.updateProduct = asyncHandler(async (req, res, next) => {
  const errors = [];
  if (!isProductExceptImageValid(req.body, errors)) {
    return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
  }
  
  const imageInRequest = req.file;

  if (imageInRequest) {
    if (!isImageValid(req.file, errors)) {
      return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
    }
  }
  const id = req.params.id;

  if (!isProductIdValid(id, errors)) {
    return next(new ErrorResponse(errors.join(','), BAD_REQUEST));
  }

  let productSavedInDBPreviously = await Product.findById(id);

  if (!productSavedInDBPreviously) {
    return next(new ErrorResponse(`Product with id ${id} was not found`, BAD_REQUEST));
  }

  const { name, price, categoryId } = req.body;

  const imagePath = imageInRequest ? ('.' + path.sep + imageInRequest.path) : productSavedInDBPreviously.imagePath; 
  
  const productWithUpdatedFields = {
    id, name, price, imagePath, categoryId
  }
  const result = await Product.update(productWithUpdatedFields);
  if (imageInRequest && (result.changedRows === 1)) {
    fileHelper.deleteFile(productSavedInDBPreviously.imagePath);
  }

  return res.status(OK).json({ success: true, data: productWithUpdatedFields }); 
});

//@route    GET /api/products/totalNumber
//@desc     Get total number of products
//@access   Public
exports.getNumberOfProducts = asyncHandler(async (req, res, next) => {
  const numberOfProducts = await Product.getNumberOfProducts();

  return res.status(OK).json({ success: true, data: { numberOfProducts: numberOfProducts } });
});