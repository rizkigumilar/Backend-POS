require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const Cors = require('cors')
const logger = require('morgan')
const app = express()
const port = process.env.SERVER_PORT || 5000

const itemRoute = require('./src/routes/route')


app.use(logger('dev'))


app.listen(port, () => {
    console.log(`App listening to Port ${port}...`)
})
app.use(Cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


app.use('/', itemRoute)