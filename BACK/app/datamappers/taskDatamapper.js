const db_connect = require('../db_connect');

const taskDatamapper = {

  // Get all tasks
  findAll: () => {

    const query = `SELECT * FROM task`;
    return new Promise((resolve, reject) => {

      db_connect.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });

    })
  },

  // Get one task
  findOne: (id) => {

    const query = `SELECT * FROM task WHERE id = ?`;

    return new Promise((resolve, reject) => {   
        db_connect.query(query, [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
  
      }) 
  },

  // Create a task
  create: (task) => {

    const query = `INSERT INTO task (libelle, start_date, end_date, description, status, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
    if (task.end_date === "") {
      task.end_date = task.start_date;
    }
    return new Promise((resolve, reject) => {      
        db_connect.query(query, [...Object.values(task)], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      })
    
  },

    // Update a task
    update: (id, task) => {

      //Filtre les clefs qui ne sont pas vides
      const filteredTask = {};

      Object.keys(task).forEach((key) => {
        if (task[key] !== "") {
          const value = task[key];
          filteredTask[key] = value;
        }
      });

      //Création de la requête SQL    
      const placeholders = Object.keys(filteredTask).map(key => `${key} = ?`);
      const query = `UPDATE task SET ${placeholders.join(', ')} WHERE id = ?`;

      return new Promise((resolve, reject) => {       
        db_connect.query(query, [...Object.values(filteredTask), id], (error, results) => {
          if (error) {
            console.log("ERROR Update", error)
            reject(error);
          } else {
            resolve(results[0]);
          }
        });
      })
  },
    
  // Delete a task
  destroy: (id) => {
      
    const query = `DELETE FROM task WHERE id = ?`;
    
      return new Promise((resolve, reject) => {      
          db_connect.query(query, [id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(results[0]);
            }
          });
      })
  },

    getTasksByUser : async (id) => {

      const query = `SELECT task.*, user.firstname, user.lastname FROM task INNER JOIN user ON task.user_id = user.id WHERE task.user_id = ?`;

      return new Promise((resolve, reject) => {       
        db_connect.query(query, [id], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve (results);
          }
        });
      })
    }
};

module.exports = taskDatamapper;
