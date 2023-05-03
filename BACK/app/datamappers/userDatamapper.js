const db_connect = require('../db_connect');

const userDatamapper = {
    // Get all users
    findAll: () => {
        const query = `SELECT * FROM user`;
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

    // Get one user
    findOne: (id) => {
        const query = `SELECT * FROM user WHERE id = ?`;
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

    // Create a user
    create: (user) => {
        const query = `INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            db_connect.query(query, [...Object.values(user)], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Update a user
    update: (id, user) => {
        const query = `UPDATE user SET firstname = ?, lastname = ?, email = ?, password = ? WHERE id = ?`;
        return new Promise((resolve, reject) => {
            db_connect.query(query, [...Object.values(user), id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        })
    },

    // Delete a user
    delete: (id) => {
        const query = `DELETE FROM user WHERE id = ?`;
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

    // Find a user by email
    findByEmail: (email) => {
        const query = `SELECT * FROM user WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db_connect.query(query, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        }
    )},

}
 module.exports = userDatamapper;