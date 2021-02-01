const pool = require('../database/db');
const { SERVER_ERROR } = require('../constValues/httpStatusCodes');

class Product {
  static async findByCategory(categoryId) {
    const sql = `
        SELECT * FROM products
        WHERE categoryId = ?
      `; 
    try {
      const result = await pool.query(sql, [categoryId]);
      return result[0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }      
  };

  static async findByProductName(productName) {
    const sql = `
        SELECT * FROM products
        WHERE name = ?
      `; 
    try {
      const result = await pool.query(sql, [productName]);
      return result[0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }      
  };

  static async findById(id) {
    const sql = `
        SELECT * FROM products
        WHERE id = ?
      `; 
    try {
      const result = await pool.query(sql, [parseInt(id)]);
      return result[0][0];

    } catch(err) {
      err.statusCode = SERVER_ERROR;
      throw err;
    }      
  };

  static async create(product) {
    const sql = `
        INSERT INTO products 
          (name, price, imagePath, categoryId)
        VALUES (?)
    `;

    try {
      const result = await pool.query(sql, [[product.name, product.price, product.imagePath, product.categoryId]]);
      return result[0];

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }
  
  static async update(product) {
    const sql = `
        UPDATE products
        SET ?
        WHERE id = ?
      `;
    try {
      const result = await pool.query(sql, [product, parseInt(product.id)]);
      return result[0];

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }

  static async getNumberOfProducts(order) {
    const sql = `      
        SELECT COUNT (id) 
        AS numberOfProducts
        FROM products
      `;
    try {
      const result = await pool.query(sql);
      return result[0][0].numberOfProducts;

    } catch(err) {
        err.statusCode = SERVER_ERROR;
        throw err;
    }    
  }  
};

module.exports = Product;
