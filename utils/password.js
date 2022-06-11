// required imports
const bcrypt = require('bcryptjs')

const hash = async (pwd, saltRound = 12) => {
  // set the salt and hash the password
  const salt = await bcrypt.genSalt(saltRound)
  return await bcrypt.hash(pwd, salt)
}

const compare = async (pwd, hashedPwd) => {
  return await bcrypt.compare(pwd, hashedPwd)
}

module.exports = {
  hash,
  compare,
}
