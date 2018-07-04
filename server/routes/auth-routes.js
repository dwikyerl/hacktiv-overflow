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

router.get(
  '/verify-admin',
  authMiddlewares.verifyToken,
  authMiddlewares.authorizeAdmin,
  authControllers.verifyAdmin
);

module.exports = router;