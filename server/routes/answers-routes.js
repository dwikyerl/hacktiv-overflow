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
  .get(
    authMiddlewares.verifyToken,
    catchErrors(answersControllers.fetchAnswerById)
  )
  .delete(
    authMiddlewares.verifyToken,
    catchErrors(answersControllers.deleteAnswer)
  )
  .put(
    authMiddlewares.verifyToken,
    catchErrors(answersControllers.updateAnswer)
  )

router.post('/:answerId/upvote',
  authMiddlewares.verifyToken,
  catchErrors(answersControllers.upvote))

router.post('/:answerId/downvote',
  authMiddlewares.verifyToken,
  catchErrors(answersControllers.downvote))

module.exports = router;