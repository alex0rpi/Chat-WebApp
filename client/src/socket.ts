import { io } from "socket.io-client";

export const socket = io('http://localhost:5000', {
  reconnectionAttempts: 5,
  reconnectionDelay: 5000,
  autoConnect: false,
});
