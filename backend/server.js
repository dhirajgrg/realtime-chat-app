import express from 'express'
import { createServer } from 'http'
import initSocket from './socket.js'
const app = express()

const server = createServer(app)

 initSocket(server)



server.listen(3000, () => {
    console.log(`Server is listening on PORT: 3000`)
})