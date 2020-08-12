const Room = require('../models/rooms')

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
    getUserRooms: (req, res) => {
        Room.find({ users: req.user._id }).then(doc => {
            res.send(doc)
        })
    },
    getRoom: (req, res) => {
        Room.findById(req.params.roomId).then(doc => res.send(doc))
    }
}