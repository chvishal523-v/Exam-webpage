const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const { startExam, submitExam } = require('../controllers/examController');

router.get('/start', auth, startExam);

router.post('/submit', auth, [
  body('answers').isArray({ min: 1 }).withMessage('Answers array required'),
  body('answers.*.questionId').notEmpty().withMessage('questionId required'),
  body('answers.*.selectedOption').notEmpty().withMessage('selectedOption required'),
], submitExam);

module.exports = router;
