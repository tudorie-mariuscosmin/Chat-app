const router = require('express').Router()
const auth = require('./auth')
const user = require('./user')
const rooms = require('./rooms')

router.use('/auth', auth)
router.use('/user', user)
router.use('/rooms', rooms)

module.exports = router;
