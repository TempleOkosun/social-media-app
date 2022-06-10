const request = require('supertest')
const app = require('../../app')

const register = async (name, email, password, confirmPassword) => {
  const res = await request(app).post('/api/register').send({
    name,
    email,
    password,
    confirmPassword,
  })
  return res
}

const login = async (email, password) => {
  const res = await request(app).post('/api/login').send({
    email,
    password,
  })
  const cookie = res.headers['set-cookie']
  return cookie
}

module.exports = {
  register,
  login,
}
