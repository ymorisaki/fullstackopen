const http = require('http')
const app = require('./app')
const config = require('./util/config')

const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running http:localhost:${config.PORT}`)
})
