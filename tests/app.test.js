const mongodb = require('../tests/config/db')
const app = require('../app') // Link to the app file
const User = require('../models/user')

const { register, login } = require('./utils/utils')
const { invalidRegisteration, validRegisteration } = require('../tests/data/users')

const request = require('supertest')

// db
beforeAll(async () => await mongodb.connect())
afterEach(async () => await mongodb.clear())
afterAll(async () => await mongodb.close())

describe('Tests for register end point', () => {
  it('should fail for invalid inputs- unmatched passwords', async () => {
    const { name, email, password, confirmPassword } = invalidRegisteration
    const res = await register(name, email, password, confirmPassword)
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toBe('Passwords do not match!')
  })

  it('should pass for valid inputs', async () => {
    const { name, email, password, confirmPassword } = validRegisteration
    const res = await register(name, email, password, confirmPassword)
    const userExists = await User.findOne()
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toBe(`Registration successful. Please login ${name}`)
    expect(userExists).toBeTruthy()
  })
})

describe('Tests for authenticated end point', () => {
  it('should pass for all requests', async () => {
    const res = await request(app).get('/api/tweets')
    expect(res.statusCode).toEqual(200)
  })

  it('should pass for authenticated requests', async () => {
    const { name, email, password, confirmPassword } = validRegisteration
    await register(name, email, password, confirmPassword)
    const cookie = await login(email, password)
    const res = await request(app).get('/api/tweets').set('cookie', cookie)
    expect(res.statusCode).toEqual(200)
  })
})
