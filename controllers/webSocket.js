
module.exports = (socket) => {

    console.log('New WS connection')
    socket.emit('message', 'merge?')
    socket.broadcast.emit('message', "a new user connected")
    socket.on('disconnect', () => {
        io.emit('message', 'a user has left the chat')
    })
}