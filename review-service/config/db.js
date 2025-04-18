const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();  // Memuat variabel dari .env

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME_REVIEW,  // Menggunakan variabel DB_NAME_REVIEW dari .env
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('MySQL Connected (ReviewService)');
});

module.exports = connection;
