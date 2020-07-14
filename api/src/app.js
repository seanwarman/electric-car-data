const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Prometheus = require('prom-client')

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

app.use(bodyParser())

app.use((req, res, next) => {
  PrometheusMetrics.requestCounter.inc()
  next()
})


app.get('/data/:term', getData)






module.exports = app
