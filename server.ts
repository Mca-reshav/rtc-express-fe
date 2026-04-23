import http from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import app from "./index";
import { connectDB } from "./config/db.config";
import { setupSocket } from "./sockets/session.socket";

dotenv.config();
connectDB();

const server = http.createServer(app),
  io = new Server(server, { cors: { origin: "*" } });

setupSocket(io);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));