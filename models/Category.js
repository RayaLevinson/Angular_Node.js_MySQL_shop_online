const pool = require('../database/db');
const { SERVER_ERROR } = require('../constValues/httpStatusCodes');

class Category {
  static async findAll() {
    const sql = `
        SELECT * FROM categories
      `; 
    try {
      const result = await pool.query(sql);
      return result[0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }      
  };
};

module.exports = Category;
