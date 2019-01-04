const http = require('http')
const routes = require('./routes')

const server = http.createServer(routes.eventos)

server.listen(3000, () => console.log('escuchando desde 3000'))
