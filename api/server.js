const express = require('express')
const helmet = require('helmet')

const lambdaRouter = require('../routes/lambdaRouter')

const server = express()

server.use(helmet())
server.use(express.json())

server.use('/api/cohorts', lambdaRouter)

module.exports = server