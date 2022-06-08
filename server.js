const app = require('./app')

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`The API is listening on port: ${port}`)
})
