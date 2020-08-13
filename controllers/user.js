const User = require('../models/user')
module.exports = {
    getUserProfile: (req, res) => {

    },
    getUsers: async (req, res) => {
        const users = await User.find()

        const data = users.map(user => {
            if (user.id !== req.user.id) {
                const { firstName, lastName, _id } = user
                return { firstName, lastName, 'id': _id }
            }


        })
        res.send(data.filter(x => x != null))
    }





}