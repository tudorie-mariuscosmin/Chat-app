
module.exports = (socket) => {

    console.log('New WS connection')

    socket.emit('info', 'welcome to Chat App')

    socket.broadcast.emit('info', "a new user connected")


    socket.on('disconnect', () => {
        socket.broadcast.emit('info', 'a user has left the chat')
    })
    socket.on('message', msg => socket.broadcast.emit('message', msg))

}