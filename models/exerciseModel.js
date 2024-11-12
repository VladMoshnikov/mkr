const db = require('../config');

const Exercise = {
    create: (newExercise, callback) => {
        const sql = 'INSERT INTO Exercises (pib, run100m, run3km, pushups, gender) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [newExercise.pib, newExercise.run100m, newExercise.run3km, newExercise.pushups, newExercise.gender], callback);
    },

    findAll: (callback) => {
        const sql = 'SELECT * FROM Exercises';
        db.query(sql, callback);
    },

    findById: (id, callback) => {
        const sql = 'SELECT * FROM Exercises WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    update: (id, updatedExercise, callback) => {
        const sql = 'UPDATE Exercises SET pib = ?, run100m = ?, run3km = ?, pushups = ?, gender = ? WHERE id = ?';
        db.query(sql, [updatedExercise.pib, updatedExercise.run100m, updatedExercise.run3km, updatedExercise.pushups, updatedExercise.gender, id], callback);
    },

    delete: (id, callback) => {
        const sql = 'DELETE FROM Exercises WHERE id = ?';
        db.query(sql, [id], callback);
    }
};

module.exports = Exercise;
