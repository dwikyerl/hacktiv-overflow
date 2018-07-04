const router = require('express').Router();
const { authControllers } = require('./../controllers');
const { validateLogin, checkValidation } = require('./../middlewares/validation');
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');

router.post(
  '/login',
  validateLogin,
  checkValidation,
  catchErrors(authControllers.login)
);

router.post('/login/oauth', catchErrors(authControllers.oauth));

module.exports = router;