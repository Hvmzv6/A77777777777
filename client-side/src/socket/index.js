import { io } from "socket.io-client";
const SOCKET_URL = "http://localhost:5000";
const socket = io(SOCKET_URL);
const userId = localStorage.getItem("userId");
const role = localStorage.getItem("userRole");

socket.on("disconnect", () => {
  socket.emit("user_disconnect", { userId, role });
});
socket.on("connect", () => {
  socket.emit("join", { userId, role });
});
export default socket;
