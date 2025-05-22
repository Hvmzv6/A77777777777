const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const http = require("http");

const connectDB = require("./config/dbConfig");
const attestationRoutes = require("./routes/attestationRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const themeRoutes = require("./routes/themeRoutes");
const participantsRoutes = require("./routes/participantRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const startNotificationWatcher = require("./changeStreams/notificationWatcher");
const { Server } = require("socket.io");

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
connectDB();
startNotificationWatcher();

app.use(express.json());

// Make io accessible in routes
app.set("socketio", io);

// Routes
io.on("connection", (socket) => {
  socket.on("join", ({ userId, role }) => {
    socket.join("notifications");
    console.log(`${role} ${userId} is connected`);
  });

  socket.on("user_disconnect", ({ userId, role }) => {
    console.log(`${role} disconnected: ${userId}`);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", trainingRoutes);
app.use("/api/", themeRoutes);
app.use("/api/", participantsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/attestations", attestationRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
