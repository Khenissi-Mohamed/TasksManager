const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Mohamed1',
  database: 'task'
});



connection.connect((error) => {
  if (error) {
      console.error('Erreur de connexion à MySQL :', error);
      return;
  }
  console.log('Connecté à la base de données MySQL.');
});


module.exports = connection;