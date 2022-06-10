const mongodb = require('../tests/config/db')
const app = require('../app') // Link to the app file

const request = require('supertest')
const cookieParser = require('cookie-parser')
const assert = require('assert')
// const should = require('should')

// db
beforeAll(async () => await mongodb.connect())
afterEach(async () => await mongodb.clear())
afterAll(async () => await mongodb.close())

describe('given an email, name, password and confirm password', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/test')
    expect(response.statusCode).toBe(200)
  })
})
