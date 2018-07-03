const router = require('express').Router();

// Import some routes
const authRoutes = require('./auth-routes');
const userRoutes = require('./users-routes');

router.use('/', authRoutes);
router.use('/users', userRoutes);

module.exports = router;