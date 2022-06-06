const express = require('express')

const app = express()

app.get("/", (req, res) => {
    res.send("Hello world from node js")
})

const port = 8000
app.listen(port, () => {
    console.log(`The API is listening on port: ${port}`)
})