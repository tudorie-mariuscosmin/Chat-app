const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/register', authController.registerUser);
router.post('/login', authController.login)
router.get('/test', authController.middleware.authenticate, authController.getUser)

module.exports = router;