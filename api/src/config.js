module.exports = {
  PORT: 3333,
  AUTH_SECRET: process.env.AUTH_SECRET || 'development',
  AUTH_EXPIRY_TIME: process.env.AUTH_EXPIRY_TIME || 6 * 20,
}
