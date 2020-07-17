const mongoose = require('../config/mongodb')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    admin: { type: Boolean, default: false }
})

const User = mongoose.model("users", userSchema);
module.exports = User;