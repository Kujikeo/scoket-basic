import express from "express";
import socketio from "socket.io";
import path from "path";
import http from "http";

const app = express();
const httpServer = http.createServer(app);
const io = new socketio.Server(httpServer);

app.use(express.static(path.resolve(__dirname, "..", "public")));
io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);
  socket.on("message", (messsage) => {
    socket.emit("received", `Received message ${messsage}`);
  });
});
httpServer.listen(3333);
