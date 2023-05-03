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

    const query = `INSERT INTO task (libelle, start_date, end_date,  description, status, user_id) VALUES (?, ?, ?, ?, ?, ?)`;

    return new Promise((resolve, reject) => {
        
        db_connect.query(query, [task.libelle, task.start_date, task.end_date, task.description, task.status, task.user_id], (error, results) => {
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

      const query = `UPDATE task SET libelle = ?, start_date = ?, end_date = ?, description = ?, status = ?, user_id = ? WHERE id = ?`;

      return new Promise((resolve, reject) => {
          
        db_connect.query(query, [task.libelle, task.start_date, task.end_date, task.description, task.status, task.user_id, id], (error, results) => {
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
  delete: (id) => {
      
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

  
        




};


module.exports = taskDatamapper;
