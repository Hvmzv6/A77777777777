const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/dbConfig");
const attestationRoutes = require("./routes/attestationRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const trainingRoutes = require("./routes/trainingRoutes");
const themeRoutes = require("./routes/themeRoutes");
const participantsRoutes = require("./routes/participantRoutes");
const { swaggerUi, swaggerSpec } = require("./swagger");
dotenv.config();
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", trainingRoutes);
app.use("/api/", themeRoutes);
app.use("/api/", participantsRoutes);
app.use("/api/attestations", attestationRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
