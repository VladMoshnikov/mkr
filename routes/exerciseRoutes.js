const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

router.get('/', exerciseController.getAllExercises);
router.get('/add', exerciseController.addExerciseForm);
router.post('/add', exerciseController.addExercise);
router.get('/edit/:id', exerciseController.editExerciseForm);
router.post('/edit/:id', exerciseController.updateExercise);
router.get('/delete/:id', exerciseController.deleteExercise);

module.exports = router;
