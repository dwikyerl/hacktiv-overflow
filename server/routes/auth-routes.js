const router = require('express').Router();
const { authControllers } = require('./../controllers');
const { validateSignin, checkValidation } = require('./../middlewares/validation');
const authMiddlewares = require('./../middlewares/auth-middlewares');

router.post(
  '/signin',
  validateSignin,
  checkValidation,
  authControllers.signin
);

router.get(
  '/verify-admin',
  authMiddlewares.verifyToken,
  authMiddlewares.authorizeAdmin,
  authControllers.verifyAdmin
);

module.exports = router;