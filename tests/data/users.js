const invalidRegisteration = {
  name: 'John Doe',
  email: 'jdoe@gmail.com',
  password: 'password1',
  confirmPassword: 'password0',
}

const validRegisteration = {
  name: 'John Doe',
  email: 'jdoe@gmail.com',
  password: 'password',
  confirmPassword: 'password',
}
module.exports = {
  invalidRegisteration,
  validRegisteration,
}
