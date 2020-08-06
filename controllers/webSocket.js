module.exports = function (socket) {
    console.log('New WS connection')
    socket.emit('message', 'merge?')
}