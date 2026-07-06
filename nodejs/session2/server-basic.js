const http = require('http')

/*
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})


'req' is used to listen to the incoming request from the client.
It contains information about the request - url,method and headers.
'res' is used for sending the responses to the client- can be data,status codes, an error message etc.
*/

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello from Node.js!')
})
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})

/*
'req.method' contains the HTTP method of the request(GET,POST,PUT,DELETE)
'req.url' contains the url of the request("/","/about","/users")
*/