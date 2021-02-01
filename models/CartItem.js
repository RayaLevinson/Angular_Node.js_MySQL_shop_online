const pool = require('../database/db');
const { SERVER_ERROR } = require('../constValues/httpStatusCodes');

class CartItem {
  static async findAll(cartId) {
    const sql = `
        SELECT cartItem.id, productId, quantity, itemPrice, p.name, p.imagePath  
        FROM cartItems AS cartItem
        LEFT JOIN products AS p
        ON p.id = cartItem.productId
        WHERE cartId = ?
      `; 

    try {
      const result = await pool.query(sql, [cartId]);
      return result[0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }
  };

  static async update(cartItem) {
     let sql = `
        INSERT INTO cartItems 
          (productId, quantity, itemPrice, cartId)
        VALUES (?)
        
        ON DUPLICATE KEY UPDATE 
          quantity = ?

      `;
    try {
      let result = await pool.query(sql, [[cartItem.productId, cartItem.quantity, cartItem.itemPrice, cartItem.cartId], cartItem.quantity]); 

      if (result[0].insertId > 0) {
        cartItem.id = result[0].insertId;
      } else {
        sql = `
          SELECT id  
          FROM cartItems
          WHERE productId = ?
        `;

        result = await pool.query(sql, [cartItem.productId]);        
        cartItem.id = result[0][0].id;
      }
      
      sql = `
        SELECT *   
        FROM products
        WHERE id = ?
      `;
      result = await pool.query(sql, [cartItem.productId]);
    
      cartItem.imagePath = result[0][0].imagePath;
      cartItem.name = result[0][0].name;
      return cartItem;

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }
  
  static async delete(id) {
    const sql = `
        DELETE 
        FROM cartItems 
        WHERE id = ?
      `;
    try {
      const result = await pool.query(sql, [id]);
      return result;
      
    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }
};

module.exports = CartItem;
