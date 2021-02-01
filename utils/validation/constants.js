const ID_MIN_LENGTH = 5;
const ID_MAX_LENGTH = 20;
const CITY_MIN_LENGTH = 2;
const CITY_MAX_LENGTH = 25;
const STREET_MIN_LENGTH = 2;
const STREET_MAX_LENGTH = 25;
const HOUSE_MIN_LENGTH = 1;
const HOUSE_MAX_LENGTH = 15;
const FIRST_NAME_MIN_LENGTH = 2;
const FIRST_NAME_MAX_LENGTH = 20;
const LAST_NAME_MIN_LENGTH = 2;
const LAST_NAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 70;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// Image
const MAX_FILE_UPLOAD_SIZE_IN_BYTES = 1500000; // 1.5MB
const FILE_EXT_REGEX = /jpeg|jpg|png|gif/; // regular expression

// Product
const PRODUCT_NAME_MIN_LENGTH = 2;
const PRODUCT_NAME_MAX_LENGTH = 25;
const PRODUCT_PRICE_MIN = 0;

module.exports = {
  ID_MIN_LENGTH,
  ID_MAX_LENGTH,
  STREET_MIN_LENGTH,
  STREET_MAX_LENGTH,
  HOUSE_MIN_LENGTH,
  HOUSE_MAX_LENGTH,
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MIN_LENGTH,
  LAST_NAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  EMAIL_REGEX,
  MAX_FILE_UPLOAD_SIZE_IN_BYTES,
  FILE_EXT_REGEX,
  PRODUCT_NAME_MIN_LENGTH,
  PRODUCT_NAME_MAX_LENGTH,
  PRODUCT_PRICE_MIN
}