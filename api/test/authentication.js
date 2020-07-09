const jwt = require('jsonwebtoken')
const { expect } = require('chai')

const { generateToken, verifyUser } = require('../src/authentication')
const { AUTH_SECRET, AUTH_EXPIRY_TIME } = require('../src/config')

describe('Authentication', () => {
  describe('.generateToken', () => {
    it('returns a token with a 20 minute expiry', () => {
      const token = generateToken({ foo: 'bar' })
      const decoded = jwt.verify(token, AUTH_SECRET)
      expect(decoded.exp).to.equal(Math.floor(Date.now() / 1000 + AUTH_EXPIRY_TIME))
    })
    it('returns a token with the user details', () => {
      const user = { foo: 'bar' }
      const token = generateToken(user)
      const decoded = jwt.verify(token, AUTH_SECRET)
      expect(decoded.user).to.deep.equal(user)
    })
  })
  describe('.verifyUser', () => {
    it('returns a user object for a valid username/password', () => {
      const user = verifyUser('suefrank1234', 'lightbulb')

      expect(user).to.deep.equal({
        id: 2,
        name: 'Sue Frank',
      })
    })
    it('returns null for an invalid username/password', () => {
      const user = verifyUser('foo', 'bar')

      expect(user).to.equal(null)
    })
  })
})
