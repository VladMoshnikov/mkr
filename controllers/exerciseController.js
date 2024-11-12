const Exercise = require('../models/exerciseModel');

exports.getAllExercises = (req, res) => {
    Exercise.findAll((err, exercises) => {
        if (err) throw err;
        exercises.sort((a, b) => a.pib.localeCompare(b.pib));
        res.render('exercises', {
            title: 'Результати вправ',
            exercises: exercises,
            user: req.session.user
        });
    });
};

exports.addExerciseForm = (req, res) => {
    res.render('exerciseForm', {
        title: 'Додати новий результат',
        user: req.session.user
    });
};

exports.addExercise = (req, res) => {
    const newExercise = {
        pib: req.body.pib,
        run100m: req.body.run100m,
        run3km: req.body.run3km,
        pushups: req.body.pushups,
        gender: req.body.gender
    };
    Exercise.create(newExercise, (err, result) => {
        if (err) throw err;
        res.redirect('/exercises');
    });
};

exports.editExerciseForm = (req, res) => {
    Exercise.findById(req.params.id, (err, exercises) => {
        if (err) throw err;
        res.render('exerciseEditForm', {
            title: 'Редагувати результат',
            exercise: exercises[0],
            user: req.session.user
        });
    });
};

exports.updateExercise = (req, res) => {
    const updatedExercise = {
        pib: req.body.pib,
        run100m: req.body.run100m,
        run3km: req.body.run3km,
        pushups: req.body.pushups,
        gender: req.body.gender
    };
    Exercise.update(req.params.id, updatedExercise, (err, result) => {
        if (err) throw err;
        res.redirect('/exercises');
    });
};

exports.deleteExercise = (req, res) => {
    Exercise.delete(req.params.id, (err, result) => {
        if (err) throw err;
        res.redirect('/exercises');
    });
};
