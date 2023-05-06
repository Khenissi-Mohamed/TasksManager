const db_connect = require('../db_connect');

const userTaskDatamapper = {

    // Get all userTasks   
    findAll: () => {
        const query = `SELECT * FROM user_has_task`;
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

    // Get one userTask
    findOne: (id) => {
        const query = `SELECT * FROM user_has_task WHERE id = ?`;
    //     const query = `
    //     SELECT task.id, task.libelle, task.start_date, task.end_date, task.description, task.status, 
    //     user_has_worked_how_long.hours_worked 
    //     FROM task 
    //     JOIN user_has_task ON task.id = user_has_task.task_id 
    //     JOIN user_has_worked_how_long ON user_has_worked_how_long.user_id = user_has_task.user_id 
    //     WHERE user_has_task.user_id = ? AND user_has_task.id = ?;
    //   `;

        return new Promise((resolve, reject) => {
            db_connect.query(query, [id, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Create a userTask
    create: (userTask) => {
        const query = `INSERT INTO user_has_task (user_id, task_id) VALUES (?, ?)`;
        return new Promise((resolve, reject) => {
            db_connect.query(query, [...Object.values(userTask)], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Update a userTask
    update: (id, userTask) => {
        const query = `UPDATE user_has_task SET user_id = ?, task_id = ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db_connect.query(query, [...Object.values(userTask), id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Delete a userTask
    delete: (id) => {
        const query = `DELETE FROM user_has_task WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db_connect.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    }
};

module.exports = userTaskDatamapper;