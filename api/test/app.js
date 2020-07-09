const request = require('supertest')
const jwt = require('jsonwebtoken')
const { expect } = require('chai')

const app = require('../src/app')
const { AUTH_SECRET } = require('../src/config')

describe('app', () => {
  describe('authenticated', () => {
    const testToken = jwt.sign({ foo: 'bar' }, AUTH_SECRET)
    describe('GET /verifyToken', () => {
      it('responds to a GET on /verifyToken with 200 OK', () => {
        return request(app)
          .get('/verifyToken')
          .set('Authorization', `Bearer ${testToken}`)
          .then(response => {
            expect(response.status).to.equal(200)
            expect(response.text).to.equal('OK')
          })
      })
    })
  })
  describe('unauthenticated', () => {
    describe('POST /login', () => {
      it('returns a valid token for a valid username/password', () => {
        return request(app)
          .post('/login')
          .send({ username: 'suefrank1234', password: 'lightbulb' })
          .then(response => {
            expect(response.status).to.equal(200)
            return response
          })
          .then(response => {
            return request(app)
              .get('/verifyToken')
              .set('Authorization', `Bearer ${response.body.token}`)
              .then(authedResponse => {
                expect(authedResponse.status).to.equal(200)
                expect(authedResponse.text).to.equal('OK')
              })
          })
      })
      it('returns a 401 for an invalid username/password', () => {
        return request(app)
          .post('/login')
          .send({ username: 'foo', password: 'bar' })
          .then(response => {
            expect(response.status).to.equal(401)
            expect(response.text).to.equal('Invalid Username or Password')
          })
      })
    })
    describe('GET /verifyToken', () => {
      it('responds with a 401 invalid token error when there is an invalid token', () => {
        return request(app)
          .get('/verifyToken')
          .set('Authorization', 'Bearer 12345')
          .then(response => {
            expect(response.status).to.equal(401)
            expect(response.text).to.equal('Invalid Auth Token')
          })
      })
      it('responds with a 401 invalid token error when there is no token', () => {
        return request(app)
          .get('/verifyToken')
          .then(response => {
            expect(response.status).to.equal(401)
            expect(response.text).to.equal('Invalid Auth Token')
          })
      })
      it('responds with a 401 token expired when there is an expired token', () => {
        const expiredToken = jwt.sign({ foo: 'bar', exp: Math.floor(Date.now() / 1000) - 30 }, AUTH_SECRET)
        return request(app)
          .get('/verifyToken')
          .set('Authorization', `Bearer ${expiredToken}`)
          .then(response => {
            expect(response.status).to.equal(401)
            expect(response.text).to.equal('Auth Token Expired')
          })
      })
    })
  })
})
