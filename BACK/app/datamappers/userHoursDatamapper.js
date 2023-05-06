const db_connect = require('../db_connect');


const userHoursDatamapper = {

    // Get all userHours

    findAll: () => {

        const query = `SELECT * FROM user_has_worked_how_long`;
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

    // Get one userHours

    findOne: (id) => {

        const query = `SELECT * FROM user_has_worked_how_long WHERE id = ?`;
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

    // Create a userHours

    create: (userHours) => {

        const query = `INSERT INTO user_has_worked_how_long (user_id, hours_worked,created_at, updated_at) VALUES (?, ?, NOW(), NOW())`;
        return new Promise((resolve, reject) => {

            db_connect.query(query, [...Object.values(userHours)], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Update a userHours

    update: (id, userHours) => {

        const query = `UPDATE user_has_worked_how_long SET user_id = ?, hours_worked = ? WHERE id = ?`;
        return new Promise((resolve, reject) => {

            db_connect.query(query, [...Object.values(userHours), id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Delete a userHours

    delete: (id) => {

        const query = `DELETE FROM user_has_worked_how_long WHERE id = ?`;
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
}

module.exports = userHoursDatamapper;