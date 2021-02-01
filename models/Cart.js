const pool = require('../database/db');
const { SERVER_ERROR } = require('../constValues/httpStatusCodes');

class Cart {
  static async findOne(userId) {
    const sql = `
        SELECT * FROM carts
        WHERE userId = ? AND isOpen = true
      `; 
    try {
      const result = await pool.query(sql, [userId]);
      return result[0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }
  };

  static async create(userId) {
    const cart = { userId };
    const sql = `
        INSERT INTO carts SET ?
      `;
    try {
      const result = await pool.query(sql, cart);
      return result[0].insertId;

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }

  static async closeCart(cartId) {
    const sql = `
      UPDATE carts
      SET isOpen = false
      WHERE id = ?
      `; 
    try {
      const result = await pool.query(sql, [cartId]);

      return result[0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }
  };
};

module.exports = Cart;
