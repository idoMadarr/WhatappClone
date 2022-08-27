const express = require('express');
const { body } = require('express-validator');
const {
  signIn,
  signUp,
  verificationCode,
  verifyAccount,
} = require('../controller/authController');

const route = express.Router();

// Url: http://localhost:5000/auth/sign-in
route.post(
  '/sign-in',
  [body('email').isEmail(), body('password').isLength({ min: 6, max: 9 })],
  signIn
);

// Url: http://localhost:5000/auth/sign-up
route.post(
  '/sign-up',
  [
    body('username').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6, max: 9 }),
    body('gender', 'Gender is required').notEmpty(),
  ],
  signUp
);

// Url: http://localhost:5000/auth/verification
route.post('/verification', verificationCode);

// Url: http://localhost:5000/auth/check-verification
route.post('/check-verification', verifyAccount);

module.exports = route;
