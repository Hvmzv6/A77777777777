const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  sex: { type: String, enum: ["homme", "femme"], required: true },
  matriculeCnss: { type: String, required: true },
  CIN: { type: Number, required: true, unique: true },
  qualification: { type: String, required: true },
  lieuAffectation: { type: String, required: true },
  trainingProgramId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Training",
    required: true,
  },
});

const Participant = mongoose.model("Participant", participantSchema);
module.exports = Participant;
