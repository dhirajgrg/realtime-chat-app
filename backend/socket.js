import { Server } from 'socket.io'


const initSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: '*'
        }
    })
    return io
}


export default initSocket
