const db = require('../config');

const User = {
    create: (newUser, callback) => {
        const sql = 'INSERT INTO Users (username, password) VALUES (?, ?)';
        db.query(sql, [newUser.username, newUser.password], callback);
    },

    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM Users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }
};

module.exports = User;
