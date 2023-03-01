import http, { Server } from 'node:http'

const server = http.createServer(async (req, res) => {
  console.log('server is running')

  await json(req, res)
})

server.listen(3333)
