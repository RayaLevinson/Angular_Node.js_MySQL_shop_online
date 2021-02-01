const { isCityValid } = require('./cityValidation');
const {
  PRODUCT_PRICE_MIN,
  STREET_MIN_LENGTH,
  STREET_MAX_LENGTH,
  HOUSE_MIN_LENGTH,
  HOUSE_MAX_LENGTH,
} = require ('./constants');

const isOrderValid = (inputValues, errors) => {
  let { totalPrice, city, street, house, apartment, dateToShip, creditCardPartialDigits } = inputValues;

  if (!isCityValid(city, errors)) {
    return false;
  }
  // --> All fields are required
  if (!totalPrice) {
    errors.push(' Please add a total price');
  }

  if (!city) {
    errors.push(' Please add a city');
  }

  if (!street) {
    errors.push(' Please add a street');
  }

  if (!house) {
    errors.push(' Please add a house');
  }

  if (!apartment) {
    errors.push(' Please add an apartment');
  }

  if (!dateToShip) {
    errors.push(' Please add a dateToShip');
  }

  if (!creditCardPartialDigits) {
    errors.push(' Please add a creditCardPartialDigits');
  }

  // <-- All fields are required
  if (errors.length > 0) {
    return false;
  }  

  // --> Length of the fields
  if ((street.length < STREET_MIN_LENGTH) || (street.length > STREET_MAX_LENGTH)) {
    errors.push(` street should be at least ${STREET_MIN_LENGTH} and not more than ${STREET_MAX_LENGTH} characters`);
  }

  if ((house.length < HOUSE_MIN_LENGTH) || (house.length > HOUSE_MAX_LENGTH)) {
    errors.push(` house should be at least ${HOUSE_MIN_LENGTH} and not more than ${HOUSE_MAX_LENGTH} characters`);
  }
  // <-- Length of the fields

  if (isNaN(Number(totalPrice)) || totalPrice < PRODUCT_PRICE_MIN) {
    errors.push(` Please insert a valid total price`);
  }

  if (isNaN(Number(apartment))) {
    errors.push(` Please insert a valid apartment`);
  }

  if (isNaN(Number(creditCardPartialDigits))) {
    errors.push(` Please insert a valid credit card partial digits`);
  }

  // Used when my server is located in a different country
  let today = new Date(new Date().toLocaleString("en-US", {timeZone: "Asia/Jerusalem"})).setHours(0, 0, 0, 0);

  const selectedDate = new Date(dateToShip).setHours(0,0,0,0);

  if (selectedDate < today) {
    errors.push(` Please insert a valid date.`);
  }

  if (errors.length > 0) {
    return false;
  }

  return true;
}

exports.isOrderValid = isOrderValid;