const logger = require('./api/src/logger')
const app = require('./api/src/app')
const { PORT } = require('./api/src/config')

app.listen(PORT, () => logger.info(`app listening on port ${PORT}`))
