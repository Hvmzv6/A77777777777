const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    type: {
      type: String,
      enum: ["info", "warning", "success", "error"],
      default: "info",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
