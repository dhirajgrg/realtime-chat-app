import { Server } from "socket.io";

const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("chat message", (text) => {
     
      socket.broadcast.emit('chat message',text)
    });

    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
};

export default initSocket;
