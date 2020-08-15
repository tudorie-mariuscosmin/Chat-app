const router = require('express').Router()
const roomsController = require('../controllers/rooms')
const { authMiddleware } = require('../controllers/auth')

router.post('/privateRoom/:id', authMiddleware.authenticate, roomsController.createPrivateRoom)
router.post('/groupRoom', authMiddleware.authenticate, roomsController.createGroupRoom)
router.get('/rooms', authMiddleware.authenticate, roomsController.getUserRooms)
router.get('/room/:roomId', authMiddleware.authenticate, roomsController.getRoom)
router.delete('/messages/:roomId', authMiddleware.authenticate, roomsController.deleteMessages)
router.delete('/:roomId', authMiddleware.authenticate, roomsController.deleteRoom)

module.exports = router