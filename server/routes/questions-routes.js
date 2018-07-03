const router = require('express').Router();
const { questionsControllers } = require('./../controllers');
const { 
  validateAddQuestion,
  validateUpdateArticle,
  checkValidation } = require('./../middlewares/validation'); 
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');
const answersRoutes = require('./answers-routes');

router.route('/')
  .post(
    authMiddlewares.verifyToken,
    validateAddQuestion,
    checkValidation,
    catchErrors(questionsControllers.createQuestion)
  )
  .get(
    catchErrors(questionsControllers.fetchQuestions)
  );

router.route('/:slug')
  .get(
    catchErrors(questionsControllers.fetchQuestionBySlug)
  )
  .delete(
    authMiddlewares.verifyToken,
    catchErrors(questionsControllers.deleteQuestion)
  )
  .put(
    authMiddlewares.verifyToken,
    catchErrors(questionsControllers.updateQuestion)
  );

router.post('/:slug/upvote',
  authMiddlewares.verifyToken,
  catchErrors(questionsControllers.upvote));

router.post('/:slug/downvote',
  authMiddlewares.verifyToken,
  catchErrors(questionsControllers.downvote));

router.use('/:slug/answers', answersRoutes)

module.exports = router;