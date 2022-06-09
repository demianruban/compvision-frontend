const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist/')))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'))
})

app.listen(5000, () => {
  console.log('Listening on port ' + 5000)
})
