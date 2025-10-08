import { Server } from "socket.io";
import { Server as HttpServer } from "http";

let io: Server;

export const initializeWebSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: { origin: "*", methods: ["GET", "POST"] }
  });

  io.on("connection", (socket) => {
    socket.on("join-user", (userID) => {
      socket.join(`user-${userID}`);
    });
  });

  return io;
};

export const notifyUserUpdate = (userID: string, data: any) => {
  if (io) {
    io.to(`user-${userID}`).emit("profile-updated", data);
  }
};