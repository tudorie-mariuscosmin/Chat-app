const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken');
module.exports = {
    registerUser: async (req, res) => {
        const errors = [];
        if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.birthdate) {
            errors.push("Please complete all fields!");
        }
        if (!req.body.firstName.match(/^[A-Z]+[a-zA-Z]+$/)) {
            errors.push("Please enter a valid first name!")
        }
        if (!req.body.lastName.match(/^[A-Z]+[a-zA-Z]+$/)) {
            errors.push("Please enter a valid last name")
        }
        if (!req.body.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
            errors.push("Please enter a valid email adress!")
        }
        if (!req.body.password.match(/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){2,})(?=(?:.*\d){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,20})$/)) {
            errors.push('The password needs to have at least 8 digits and contain 1 upper case letter and one digit!')
        }
        if ((new Date().getFullYear() - new Date(req.body.birthdate).getFullYear()) < 16) {
            errors.push("You have to be at least 16 years old to register")
        }

        if (errors.length > 0) {
            res.status(400).json(errors);
        } else {
            const user = await User.findOne({ email: req.body.email })
            if (user) {
                res.status(400).json('Email is already registred')
            } else {
                bcrypt.genSalt(5, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        const user = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: hash,
                            birthdate: new Date(req.body.birthdate)
                        })
                        user.save()
                            .then((s) => res.json("User registred succesfully"))
                            .catch(err => { console.error(err); res.status(500).json('An error occured') })
                    })
                })
            }
        }
    },

    login: async (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.status(400).json('Enter credentials')
        } else if (!req.body.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)) {
            res.status(400).json('Invallid email!')
        } else {
            const user = await User.findOne({ email: req.body.email })
            if (!user) {
                res.status(404).json('User not found!')
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(result => {
                        if (result === false) {
                            res.status(401).json("Invalid Credentials")
                        } else if (result === true) {
                            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                            res.json({
                                firstName: user.firstName,
                                lastName: user.lastName,
                                admin: user.admin,
                                token: token
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).json('Something went wrong!')
                    })
            }
        }
    },
    getUser: async (req, res) => {
        res.send(req.user)
    },

    authMiddleware: {
        authenticate: (req, res, next) => {
            const AuthorizationHeader = req.headers['authorization']
            const token = AuthorizationHeader && AuthorizationHeader.split(' ')[1]

            if (!token) res.sendStatus(401);
            else {
                jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
                    if (err) res.sendStatus(403);
                    if (data) {
                        User.findOne({ _id: data.id }, (err, user) => {
                            if (err) req.sendStatus(500);
                            if (user) {
                                req.user = user
                                next()
                            }

                        })

                    }
                })
            }
        }
    }
}