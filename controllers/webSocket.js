
module.exports = (socket) => {
    socket.on('joinRoom', ({ room }) => {
        socket.join(room)
        socket.emit('info', 'welcome to Chat App')

        socket.broadcast.to(room).emit('info', "a new user connected")
    })


    // socket.on('disconnect', () => {
    //     socket.broadcast.emit('info', 'a user has left the chat')
    // })
    socket.on('message', ({ msg, room }) => socket.broadcast.to(room).emit('message', msg))

}