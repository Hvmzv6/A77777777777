const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  sex: { type: String, enum: ["homme", "femme"], required: true },
  matriculeCnss: { type: String, required: true },
  CIN: { type: String, required: true },
  qualification: { type: String, required: true },
  lieuAffectation: { type: String, required: true },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
