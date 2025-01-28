const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '160445',
    database: 'work',
  });

module.exports = connection