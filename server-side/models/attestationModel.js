const mongoose = require("mongoose");

const attestationSchema = new mongoose.Schema(
  {
    participantName: { type: String, required: true },
    trainerName: { type: String, required: true },
    trainingTheme: { type: String, required: true },
    date: { type: Date, required: true },
    filePath: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attestation", attestationSchema);
