const app = require('./app')
const mongodb = require('./utils/db')

const port = process.env.PORT || 8000
const start = async () => {
  try {
    await mongodb.connect(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server & Database setup is successful and the API is listening on port: ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
