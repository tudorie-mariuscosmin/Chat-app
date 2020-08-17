const User = require('../models/user')
const Room = require('../models/rooms')
const moment = require('moment')
const bodyParser = require('body-parser')
module.exports = {
    getUserProfile: async (req, res) => {
        const user = await User.findById(req.user._id)
        const { email, birthdate } = user
        birthdateString = birthdate.toISOString()
        const today = moment().format('YYYY-MM-DD');
        const years = moment().diff(birthdateString, 'years');
        const adjustToday = birthdateString.substring(5) === today.substring(5) ? 0 : 1;
        const nextBirthday = moment(birthdateString).add(years + adjustToday, 'years');
        const daysUntilBirthday = nextBirthday.diff(today, 'days');
        res.send({ email, birthdate, daysUntilBirthday })

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