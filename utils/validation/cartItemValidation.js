const {
  PRODUCT_PRICE_MIN
} = require ('./constants');

const isCartItemValid = (inputValues, errors) => {
  let { productId, quantity, itemPrice } = inputValues;
  // --> All fields are required
  if (!productId) {
    errors.push(' Please add a product id');
  }

  if (!quantity) {
    errors.push(' Please add a quantity');
  }

  if (!itemPrice) {
    errors.push(' Please add a price of item');
  }

  // <-- All fields are required
  if (errors.length > 0) {
    return false;
  }    

  if (isNaN(Number(productId))) {
    errors.push(` Please insert a valid product id`);
  }

  if (isNaN(Number(quantity)) || quantity <= 0) {
    errors.push(` Please insert a valid quantity`);
  }

  if (isNaN(Number(itemPrice)) || itemPrice < PRODUCT_PRICE_MIN) {
    errors.push(` Please insert a valid price`);
  }

  if (errors.length > 0) {
    return false;
  }

  return true;  
}

exports.isCartItemValid = isCartItemValid;