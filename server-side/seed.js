import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/userModel.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const seedUsers = async () => {
  await User.deleteMany();

  await User.insertMany([
    {
      name: "Admin User",
      email: "admin@cabinet.com",
      password: "admin123",
      role: "admin",
    },
    {
      name: "Client One",
      email: "client@cabinet.com",
      password: "client123",
      role: "client",
    },
    {
      name: "Trainer One",
      email: "trainer@cabinet.com",
      password: "trainer123",
      role: "trainer",
    },
  ]);

  console.log("Seeded users!");
  process.exit();
};

seedUsers();
