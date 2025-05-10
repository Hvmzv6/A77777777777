const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "trainer", "client"],
      required: true,
    },
    mustChangePassword: { type: Boolean, default: true },
    cvPath: { type: String, default: null }, // Optional field for CV
    profileImagePath: { type: String, default: null }, // Optional field for profile image
    expertise: { type: String, default: null }, // Optional field for expertise
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
