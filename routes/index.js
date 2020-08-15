const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')
const rooms = require('./rooms')
const { authMiddleware } = require('../controllers/auth')

router.use('/auth', auth)
router.use('/user', user)
router.use('/rooms', rooms)

module.exports = router;
