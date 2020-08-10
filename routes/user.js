const router = require('express').Router();
const userController = require('../controllers/user')
const { authMiddleware } = require('../controllers/auth')

router.get('/profile', authMiddleware.authenticate, userController.getUserProfile)

module.exports = router;