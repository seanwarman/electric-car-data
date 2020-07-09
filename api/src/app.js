const express = require('express')
const jwt = require('express-jwt')
const bodyParser = require('body-parser')
const cors = require('cors')
const Prometheus = require('prom-client')
const { AUTH_SECRET } = require('./config')

const getData = require('./get.js')


const collectDefaultMetrics = Prometheus.collectDefaultMetrics

const PrometheusMetrics = {
  requestCounter: new Prometheus.Counter({
    name: 'throughput',
    help: 'The number of requests served',
  }),
}

collectDefaultMetrics()
const app = express()

app.use(cors())

app.use((req, res, next) => {
  PrometheusMetrics.requestCounter.inc()
  next()
})







app.get('/data', getData)

// app.post('/login', (req, res) => {
//   const { username, password } = req.body
//   const user = verifyUser(username, password)
//   if (user) {
//     const token = generateToken(user)
//     return res.status(200).json({ token })
//   }
//   res.status(401).send('Invalid Username or Password')
// })

module.exports = app
