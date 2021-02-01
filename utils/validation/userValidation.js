const { isCityValid } = require('./cityValidation');

const {
  ID_MIN_LENGTH,
  ID_MAX_LENGTH,
  CITY_MIN_LENGTH,
  CITY_MAX_LENGTH,
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
  EMAIL_REGEX
} = require ('./constants');

const isRegistrationInputValid = (inputValues, errors) => {
  let { id, firstName, lastName, email, password, confirmPassword, role, city, street, house, apartment } = inputValues;

  if (isEmailAndPasswordValid(email, password, errors)) {
    if (isCityValid(city, errors)) {

      // --> All fields are required
      if (!id) {
        errors.push(' Please add id');
      }    
      if (!firstName) {
        errors.push(' Please add a first name');
      }
      if (!lastName) {
        errors.push(' Please add a last name');
      }
      if (!confirmPassword) {
        errors.push(' Please add a password confirmation');
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
      // <-- All fields are required
      if (errors.length > 0) {
        return false;
      }

      if (password !== confirmPassword) {
        errors.push(' Password and password confirmation are not match');
      }

      if (errors.length > 0) {
        return false;
      }

      // --> Trim values
      id = id.trim();
      firstName = firstName.trim();
      lastName = lastName.trim();
      // <-- Trim values

      // --> Length of the fields
      if ((id.length < ID_MIN_LENGTH) || (id.length > ID_MAX_LENGTH)) {
        errors.push(` Id should be at least ${ID_MIN_LENGTH} and not more than ${ID_MAX_LENGTH} characters`);
      }

      if ((firstName.length < FIRST_NAME_MIN_LENGTH) || (firstName.length > FIRST_NAME_MAX_LENGTH)) {
        errors.push(` First name should be at least ${FIRST_NAME_MIN_LENGTH} and not more than ${FIRST_NAME_MAX_LENGTH} characters`);
      }

      if ((lastName.length < LAST_NAME_MIN_LENGTH) || (lastName.length > LAST_NAME_MAX_LENGTH)) {
        errors.push(` Last name should be at least ${LAST_NAME_MIN_LENGTH} and not more than ${LAST_NAME_MAX_LENGTH} characters`);
      }    

      if ((city.length < CITY_MIN_LENGTH) || (city.length > CITY_MAX_LENGTH)) {
        errors.push(` City should be at least ${CITY_MIN_LENGTH} and not more than ${CITY_MAX_LENGTH} characters`);
      }

      if ((street.length < STREET_MIN_LENGTH) || (street.length > STREET_MAX_LENGTH)) {
        errors.push(` Street should be at least ${STREET_MIN_LENGTH} and not more than ${STREET_MAX_LENGTH} characters`);
      }

      if ((house.length < HOUSE_MIN_LENGTH) || (house.length > HOUSE_MAX_LENGTH)) {
        errors.push(` House should be at least ${HOUSE_MIN_LENGTH} and not more than ${HOUSE_MAX_LENGTH} characters`);
      }
      // <-- Length of the fields
      
      if (role) {
        if (role !== 'user') {
          errors.push(" Please enter a valid role. Possible value is 'user'");
        }
      }
    }
    if (errors.length > 0) {
      return false;
    }
  }
  if (errors.length > 0) {
    return false;
  }

  return true;
}

const isLoginInputValid = (inputValues, errors) => {
  const { email, password } = inputValues;

  if (isEmailAndPasswordValid(email, password, errors)) {
    return true;
  }
  return false;  
}

const isEmailAndPasswordValid = (email, password, errors) => {
  if (!email) {
    errors.push(' Please add an email');
  }

  if (!password) {
    errors.push(' Please add a password');
  }

  if (errors.length > 0) {
    return false;
  }

  email = email.trim();
  // Check email 
  if (!EMAIL_REGEX.test(email)) {
    errors.push(' Please enter a valid email');
  }

  if ((password.length < PASSWORD_MIN_LENGTH) || (password.length > PASSWORD_MAX_LENGTH)) {
    errors.push(` Password should be at least ${PASSWORD_MIN_LENGTH} and not more than ${PASSWORD_MAX_LENGTH} characters`);
  }

  if (errors.length > 0) {
    return false;
  }
  
  return true;
}

module.exports = {
  isRegistrationInputValid,
  isLoginInputValid
}