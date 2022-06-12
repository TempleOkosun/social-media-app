// required imports
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

let connection
let mongodb

const connect = async () => {
  mongodb = await MongoMemoryServer.create()
  connection = await mongoose.connect(mongodb.getUri(), {})
  console.log('Connected to test database.')
}

const close = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongodb.stop()
  console.log('Stopped test database')
}

const clear = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    await collections[key].deleteMany({})
  }
  console.log('Cleared test database.')
}
module.exports = { connect, close, clear }
