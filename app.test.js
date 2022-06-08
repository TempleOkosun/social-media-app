const app = require('./app') // Link to the app file
const supertest = require('supertest')
const request = supertest(app)

describe('given an email, name, password and confirm password', () => {
  test('should respond with a 200 status code', async () => {
    const response = await request(app).get('/api/test')
    expect(response.statusCode).toBe(200)
  })
})
