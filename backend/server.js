import express from 'express'
import { createServer } from 'http'
import initSocket from './socket'
const app = express()

const server = createServer(app)

const io = initSocket(server)



server.listen(8080, () => {
    console.log(`Server is listening on PORT: 8080`)
})