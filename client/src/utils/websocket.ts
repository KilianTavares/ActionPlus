import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (userID: string) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001");
    socket.emit("join-user", userID);
  }
  return socket;
};

export const onProfileUpdate = (callback: (data: any) => void) => {
  if (socket) {
    socket.on("profile-updated", callback);
  }
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};