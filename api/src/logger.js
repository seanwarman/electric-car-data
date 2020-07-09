const bunyan = require('bunyan')
const { name } = require('../../package.json')

module.exports = bunyan.createLogger({ name })
