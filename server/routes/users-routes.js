const router = require('express').Router();
const { usersControllers } = require('./../controllers');
const { validateRegister, checkValidation } = require('./../middlewares/validation');
const authMiddlewares = require('./../middlewares/auth-middlewares');

router.post(
  '/register',
  validateRegister,
  checkValidation,
  usersControllers.register,
);

router.get(
  '/me',
  authMiddlewares.verifyToken,
  usersControllers.getUserInfo
);

module.exports = router;