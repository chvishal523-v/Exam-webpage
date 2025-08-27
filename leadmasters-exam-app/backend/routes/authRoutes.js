const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// this is for registration input box validation
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username min length 3'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
], register);

router.post('/login', [
  body('emailOrUsername').notEmpty().withMessage('Email or username required'),
  body('password').notEmpty().withMessage('Password required'),
], login);

module.exports = router;
