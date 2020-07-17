const express = require('express');
const bodyParser = require('body-parser')
const routes = require('./routes/auth')
require('dotenv').config()

const app = express();

app.use(bodyParser.json())

app.use('/api', routes)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.warn(`Server started on port ${PORT}.`)
})