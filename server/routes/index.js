const router = require('express').Router();

// Import some routes
const authRoutes = require('./auth-routes');
const userRoutes = require('./users-routes');
const questionsRoutes = require('./questions-routes');

router.use('/', authRoutes);
router.use('/users', userRoutes);
router.use('/questions', questionsRoutes);

module.exports = router;