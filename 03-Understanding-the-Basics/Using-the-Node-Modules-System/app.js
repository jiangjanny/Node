const http = require('http')
const routes = require('./router')

const server = http.createServer(routes.header)

server.listen(3000);