// controllers/participantController.js
const Participant = require("../models/participantModel");

// Create participant
exports.createParticipant = async (req, res) => {
  try {
    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all participants
exports.getAllParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("cin");
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one participant by ID
exports.getParticipant = async (req, res) => {
  try {
    const participant = await Participant.findById(req.params.id).populate(
      "cin"
    );
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });
    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update participant
exports.updateParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndUpdate(
      req.params.cin,
      req.body,
      { new: true, runValidators: true }
    );
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });
    res.status(200).json(participant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete participant
exports.deleteParticipant = async (req, res) => {
  try {
    const participant = await Participant.findByIdAndDelete(req.params.id);
    if (!participant)
      return res.status(404).json({ message: "Participant not found" });
    res.status(200).json({ message: "Participant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get participants by training training
exports.getParticipantsByProgram = async (req, res) => {
  try {
    const participants = await Participant.find({
      trainingId: req.params.trainingId,
    });
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
