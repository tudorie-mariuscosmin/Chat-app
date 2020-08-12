const router = require('express').Router()
const roomsController = require('../controllers/rooms')
const { authMiddleware } = require('../controllers/auth')

router.post('/privateRoom/:id', authMiddleware.authenticate, roomsController.createPrivateRoom)
router.post('/groupRoom', authMiddleware.authenticate, roomsController.createGroupRoom)
router.get('/rooms', authMiddleware.authenticate, roomsController.getUserRooms)

module.exports = router