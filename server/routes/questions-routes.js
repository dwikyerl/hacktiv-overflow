const router = require('express').Router();
const { questionsControllers } = require('./../controllers');
const { 
  validateAddQuestion,
  validateUpdateArticle,
  checkValidation } = require('./../middlewares/validation'); 
const authMiddlewares = require('./../middlewares/auth-middlewares');
const { catchErrors } = require('../handlers/errorHandlers');

router.route('/')
  .post(
    authMiddlewares.verifyToken,
    validateAddQuestion,
    checkValidation,
    catchErrors(questionsControllers.createQuestion)
  )
  .get(
    catchErrors(questionsControllers.fetchAllQuestions)
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
  )

module.exports = router;