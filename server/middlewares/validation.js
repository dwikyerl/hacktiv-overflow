const { validationResult, body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const { User } = require('./../models');

exports.validateSignup = [
  body('email')
    .not().isEmpty().withMessage('Email must not be empty')
    .isEmail()
    .normalizeEmail()
    .trim()
    .custom((value) => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject('Email already in use');
        }
      });
    }),
  body('username')
    .not().isEmpty().withMessage('Email must not be empty')
    .isString()
    .trim()
    .isLength({ min: 6 })
    .matches(/^\w+$/).withMessage('Username must be alphanumeric')
    .custom((value) => {
      return User.findOne({ username: value }).then(user => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
  body('confirmPassword')
    .not().isEmpty().withMessage('Password confirmation must not be empty'),
  body('password')
    .not().isEmpty().withMessage('Password must not be empty')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error ('Passwords do not match');
      } else {
        return value;
      }
    })
];

exports.validateLogin = [
  body('username')
    .not().isEmpty().withMessage('Username must not be empty')
    .isString()
    .customSanitizer((value, { req }) => {
      if (value.includes('@')) {
        return value.toLowerCase();
      } else {
        return value;
      }
    }),
  body('password')
    .not().isEmpty().withMessage('Password must not be empty')
];

exports.validateAddQuestion = [
  body('title')
    .trim()
    .isString()
    .not().isEmpty().withMessage('Title must not be empty'),
  body('content')
    .trim()
    .isString()
    .not().isEmpty().withMessage('Content must not be empty')
];

exports.validateAddAnswer = [
  body('content')
    .trim()
    .isString()
    .not().isEmpty().withMessage('Content must not be empty')
];

exports.checkValidation = (req, res, next)  => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
}