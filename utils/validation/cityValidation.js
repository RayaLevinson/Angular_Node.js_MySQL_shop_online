const cities = require('../../data/cities/cities.json');

const isCityValid = (city, errors) => {
  const citiesArray = [];
  cities.forEach(item => citiesArray.push(item.name.toLowerCase()))

  if (citiesArray.includes(city.toLowerCase())) {
    return true;
  }
  errors.push(' City is not valid');
  return false;
}

exports.isCityValid = isCityValid;
