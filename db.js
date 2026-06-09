const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la BD:', err.message);
    process.exit(1);
  }
  console.log('Conectado a MySQL correctamente');
});

module.exports = connection;
  