const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
      console.error('Erreur de connexion à MySQL :', error);
      return;
  }
  console.log('Connecté à la base de données MySQL.');
});


module.exports = connection;