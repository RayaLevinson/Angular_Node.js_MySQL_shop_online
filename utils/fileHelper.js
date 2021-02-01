const fs = require('fs');

const deleteFile = filePath => {
  fs.unlink(filePath, (err) => {
    if (err) console.log(err);
  });
}

const createFile = (filePath, order) => {
  let text = `Product     |   Quantity   |  Product's Price \n================================= \n`;

  order.cartItems.forEach(item => {
    text += `${item.name} ${item.quantity}  ₪ ${item.itemPrice} \n`;
  });
  text += `================================= \nTotal Price: ₪ ${order.totalPrice} \n`;


  fs.writeFile(filePath, text, function (err) {
    if (err) throw err;
  });
}

module.exports = {
  deleteFile,
  createFile
}
