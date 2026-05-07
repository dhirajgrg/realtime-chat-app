import "dotenv/config";
import { createServer } from "http";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import initSocket from "./src/socket/socket.js";

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection : ", err);
});
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception : ", err);
});

const initServer = async () => {
  try {
    const PORT=process.env.PORT || 5000
    const server = createServer(app);
    await connectDB();
    initSocket(server);
    server.listen(PORT, () => {
      console.log(`Server is listening on port : ${PORT}`);
    });
  } catch (error) {
    console.log("Fail to start server", error);
    process.exit(1);
  }
};

initServer();
