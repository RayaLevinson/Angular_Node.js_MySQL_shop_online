const pool = require('../database/db');
const { SERVER_ERROR } = require('../constValues/httpStatusCodes');

class User { 
  static async findById(id) {
    const sql = `
        SELECT * FROM users
        WHERE users.id = ?
      `; 
    
    try {
      const result = await pool.query(sql, [id]);
      return result[0];

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }
  }

  static async findOneByEmail(email) {
    const sql = `
        SELECT * FROM users
        WHERE users.email = ?
      `; 
    
    try {
      const result = await pool.query(sql, [email]);
      return result[0];

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }
  }

  static async create(user) {
    const sql = `
        INSERT INTO users 
          (id, firstName, lastName, email, password, city, street, house, apartment)
        VALUES (?)
    `;

    try {
      const result = await pool.query(sql, [[user.id, user.firstName, user.lastName, user.email, user.encryptedPassword, user.city, user.street, user.house, user.apartment ]]);
      return result[0];

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }  
};

module.exports = User;
