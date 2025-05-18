const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema(
  {
    ref: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },

    theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: true,
    },
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    numberOfDays: { type: Number, required: true },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trainerPhone: { type: String },
    CIN: { type: String },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clientPhone: { type: String },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Participant",
      },
    ],
  },
  { timestamps: true }
);

const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
