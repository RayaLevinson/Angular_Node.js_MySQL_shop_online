const pool = require('../database/db');
const { SERVER_ERROR } = require('../constValues/httpStatusCodes');

class Order {
  // creditCardPartualDigits are saved in database according to requirements
  static async create(order) {
    const sql = `
      INSERT INTO orders
        (totalPrice, userId, cartId, city, street, house, apartment, dateToShip, creditCardPartialDigits)
      VALUES (?)
      `;
    try {
      const result = await pool.query(sql, [[order.totalPrice, order.userId, order.cartId, order.city, order.street, order.house, order.apartment, order.dateToShip, order.creditCardPartialDigits ]]);
      return result[0].insertId;

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }
  
  static async getTotalNumberOfOrders(order) {
    const sql = `      
        SELECT COUNT (id) 
        AS numberOfOrders
        FROM orders
      `;
    try {
      const result = await pool.query(sql);
      return result[0][0].numberOfOrders;
    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }
  
  static async getLatestOrder(userId) {
    const sql = `      
        SELECT *        
        FROM orders
        WHERE userId = ?
        ORDER BY createdAt DESC
      `;
    try {
      const result = await pool.query(sql, userId);
      return result[0];

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }

  static async getNumberOfOrders(date) {
    const sql = `      
        SELECT COUNT (id)
        AS numberOfOrders        
        FROM orders
        WHERE dateToShip = ?
      `;
    try {
      const result = await pool.query(sql, date);
      return result[0][0].numberOfOrders;

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }
  
};

module.exports = Order;
