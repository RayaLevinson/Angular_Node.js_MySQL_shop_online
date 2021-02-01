const {
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_PRICE_MIN
} = require ('./constants');

const isProductExceptImageValid = (inputValues, errors) => {
  let { name, price, categoryId } = inputValues;
  // --> All fields are required
  if (!name) {
    errors.push(' Please add a name');
  }

  if (!price) {
    errors.push(' Please add a price');
  }

  if (!categoryId) {
    errors.push(' Please add a category id');
  }

  // <-- All fields are required
  if (errors.length > 0) {
    return false;
  }  

  // --> Trim values
  name = name.trim();
  // <-- Trim values

  // --> Length of the fields
  if ((name.length < PRODUCT_NAME_MIN_LENGTH) || (name.length > PRODUCT_NAME_MAX_LENGTH)) {
    errors.push(` name should be at least ${PRODUCT_NAME_MIN_LENGTH} and not more than ${PRODUCT_NAME_MAX_LENGTH} characters`);
  }
  // <-- Length of the fields

  if (isNaN(Number(price)) || price < PRODUCT_PRICE_MIN) {
    errors.push(` Please insert a valid price`);
  }

  if (isNaN(Number(categoryId))) {
    errors.push(` Please insert a valid category id`);
  }

  if (errors.length > 0) {
    return false;
  }

  return true;
}

const isProductIdValid = (id, errors) => {
  if (isNaN(Number(id))) {
    errors.push('Product id is invalid.');
    return false;
  }
  return true;
}

const isImageValid = (image, errors) => {
  // Image is required  
  if (!image) {
    errors.push(' Please add an image!');
    return false;
  }
  return true; 
}

module.exports = {
  isProductExceptImageValid,
  isImageValid,
  isProductIdValid
}