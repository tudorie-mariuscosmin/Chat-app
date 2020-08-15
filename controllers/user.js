const User = require('../models/user')
const Room = require('../models/rooms')
module.exports = {
    getUserProfile: (req, res) => {

    },
    getUsers: async (req, res) => {
        const users = await User.find()

        const data = users.map(user => {
            if (user.id !== req.user.id) {
                const { firstName, lastName, _id } = user
                return { name: `${firstName} ${lastName}`, 'id': _id }
            }


        })
        res.send(data.filter(x => x != null))
    },
    deleteUser: (req, res) => {
        Room.deleteMany({ users: req.user._id }, (err, rooms) => {
            if (err)
                res.sendStatus(500);
            else {
                User.deleteOne({ _id: req.user._id }, (err, user) => {
                    if (err)
                        res.sendStatus(500);
                    else {
                        res.sendStatus(200)
                    }
                })
            }
        })

    }





}