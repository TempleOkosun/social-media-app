// passwords dont match
const invalidRegisteration = {
  name: 'John Doe',
  email: 'jdoe@gmail.com',
  password: 'password1',
  confirmPassword: 'password0',
}
// passwords match
const validRegisteration = {
  name: 'John Doe 1',
  email: 'jdoe@gmail.com',
  password: 'password1',
  confirmPassword: 'password1',
}
module.exports = {
  invalidRegisteration,
  validRegisteration,
}
