const mongoose = require('../config/mongodb')
const User = require('./user')

const roomSchema = new mongoose.Schema({
    group: { type: Boolean },
    roomName: { type: String },
    users: { type: [mongoose.ObjectId], required: true }
})

const Room = mongoose.model('rooms', roomSchema);
module.exports = Room;