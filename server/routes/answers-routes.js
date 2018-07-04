const router = require('express').Router({ mergeParams: true });
const { answersControllers } = require('./../controllers');
const { 
  validateAddAnswer,
  checkValidation } = require('./../middlewares/validation'); 
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');

router.route('/')
  .post(
    authMiddlewares.verifyToken,
    validateAddAnswer,
    checkValidation,
    catchErrors(answersControllers.createAnswer)
  )

router.route('/:answerId')
  .delete(
    authMiddlewares.verifyToken,
    catchErrors(answersControllers.deleteAnswer)
  )
  .put(
    authMiddlewares.verifyToken,
    catchErrors(answersControllers.updateAnswer)
  )

module.exports = router;