const express = require('express')
const helmet = require('helmet')

const lambdaRouter = require('../routes/lambdaRouter')
const studentRouter = require('../routes/studentsRouter')

const server = express()

server.use(helmet())
server.use(express.json())

server.use('/api/cohorts', lambdaRouter)
server.use('/api/students', studentRouter)

module.exports = server