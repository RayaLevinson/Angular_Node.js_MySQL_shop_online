const mysql = require('mysql2');
const config = require('config');

const database = config.get('dbName');
const user = config.get('username');
const password = config.get('password');
const host = config.get('host');

const pool = mysql.createPool({
  connectionLimit: 100,
  host,
  user,
  database,
  password
});

module.exports = pool.promise();