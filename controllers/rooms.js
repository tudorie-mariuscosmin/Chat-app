const Room = require('../models/rooms');
const User = require('../models/user')

module.exports = {
    createPrivateRoom: (req, res) => {
        Room.findOne({ users: [req.user._id, req.params.id] }).then(doc => {
            if (doc)
                res.status(400).send('Already exists');
            else {
                const room = new Room({
                    group: false,
                    roomName: 'Private Chat',
                    users: [req.user._id, req.params.id]
                })
                room.save()
                res.status(201).send(room)
            }
        })
    },
    createGroupRoom: (req, res) => {
        const users = [req.user._id];
        req.body.users.forEach(user => {
            users.push(user)
        });
        if (!req.body.roomName)
            res.status(400).send('Please enter a Group name');
        else {
            if (users.length > 2) {
                const room = new Room({
                    group: true,
                    roomName: req.body.roomName,
                    users
                })
                room.save();
                res.status(201).send(room)
            } else
                res.status(400).send('You have to select at least 2 users for a group chat')
        }
    },
    getUserRooms: async (req, res) => {
        const rooms = await Room.find({ users: req.user._id })
        const users = await User.find()
        const data = rooms.map(room => {
            let { id, roomName } = room
            if (!room.group) {
                user = users.find(user => user.id == room.users.filter(x => x != req.user.id)[0])
                roomName = `${user.firstName} ${user.lastName}`
            }
            return { id, roomName }
        })
        res.send(data)

    },
    getRoom: (req, res) => {
        Room.findById(req.params.roomId).then(room => {
            let { id, roomName } = room
            if (!room.group) {
                User.findById(room.users.filter(x => x != req.user.id)[0]).then(user => {
                    roomName = `${user.firstName} ${user.lastName}`
                    res.send({ id, roomName })
                })
            } else {
                res.send({ id, roomName })
            }
        })
    }
}