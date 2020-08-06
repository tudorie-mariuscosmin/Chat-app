const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/auth')
const http = require('http')
const socketio = require('socket.io')
const wsController = require('./controllers/webSocket')
require('dotenv').config()

const app = express();
const server = http.createServer(app)
const io = socketio(server)

app.use(bodyParser.json())
app.use('/api', routes)

io.on('connection', wsController)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.warn(`Server started on port ${PORT}.`)
})