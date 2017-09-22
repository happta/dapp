const express = require('express')
const app = express()

app.use('/', express.static(__dirname))

app.listen(5005, function () {
  console.log('Example app listening on port 5005!')
})
