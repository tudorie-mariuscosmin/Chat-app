const router = require('express').Router();
const userController = require('../controllers/user')
const { authMiddleware } = require('../controllers/auth')

router.get('/profile', authMiddleware.authenticate, userController.getUserProfile)
router.get('/users', authMiddleware.authenticate, userController.getUsers)
router.delete('/', authMiddleware.authenticate, userController.deleteUser)

module.exports = router;