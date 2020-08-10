module.exports = {
    getUserProfile: (req, res) => {
        res.send(req.user)
    }
}