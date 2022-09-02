const express = require('express');
const { body } = require('express-validator');
const {
  signIn,
  signUp,
  verificationCode,
  verifyAccount,
  googleSignIn,
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
  ],
  signUp
);

// Url: http://localhost:5000/auth/verification
route.post('/verification', [body('email').isEmail()], verificationCode);

// Url: http://localhost:5000/auth/account-verification
route.post('/account-verification', [body('email').isEmail()], verifyAccount);

// Url: http://localhost:5000/auth/google-oauth
route.post('/google-oauth', [body('email').isEmail()], googleSignIn);

module.exports = route;
