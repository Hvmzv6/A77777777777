const Training = require("../models/trainingModel");

const createTraining = async (req, res) => {
  console.log("🚀 ~ createTraining ~ req:", req.body);
  try {
    const {
      ref,
      status,
      theme,
      title,
      startDate,
      endDate,
      // numberOfDays : calculatedNumberOfDays,
      trainer,
      trainerPhone,
      CIN,
      client,
      clientPhone,
      participants = [], // ✅ accept participants array from body
    } = req.body;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Start and end dates are required" });
    }

    const calculatedNumberOfDays = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24)
    );

    const newTraining = new Training({
      ref,
      status,
      theme,
      title,
      startDate,
      endDate,
      numberOfDays: calculatedNumberOfDays,
      trainer,
      trainerPhone,
      CIN,
      client,
      clientPhone,
      participants,
    });

    const savedTraining = await newTraining.save();
    res.status(201).json({
      message: "Training created successfully",
      training: savedTraining,
    });
  } catch (err) {
    console.error("Error creating training:", err);
    res.status(500).json({ error: "Failed to create training" });
  }
};

const getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find();
    res.json(trainings);
  } catch (err) {
    console.error("Error fetching trainings:", err);
    res.status(500).json({ error: "Failed to fetch trainings" });
  }
};

const getTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);

    if (!training) return res.status(404).json({ error: "Training not found" });
    res.json(training);
  } catch (err) {
    console.error("Error getting training:", err);
    res.status(500).json({ error: "Failed to get training" });
  }
};

const updateTraining = async (req, res) => {
  try {
    const updatedData = { ...req.body };

    if (updatedData.startDate && updatedData.endDate) {
      const calculatedNumberOfDays = Math.ceil(
        (new Date(updatedData.endDate) - new Date(updatedData.startDate)) /
          (1000 * 3600 * 24)
      );
      updatedData.numberOfDays = calculatedNumberOfDays;
    }

    const updatedTraining = await Training.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedTraining)
      return res.status(404).json({ error: "Training not found" });

    res.json(updatedTraining);
  } catch (err) {
    console.error("Error updating training:", err);
    res.status(500).json({ error: "Failed to update training" });
  }
};

const deleteTraining = async (req, res) => {
  try {
    const training = await Training.findByIdAndDelete(req.params.id);
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.json({ message: "Training deleted successfully" });
  } catch (err) {
    console.error("Error deleting training:", err);
    res.status(500).json({ error: "Failed to delete training" });
  }
};
const approveTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ error: "Training not found" });
    training.approved = true;
    await training.save();
    res.json(training);
  } catch (err) {
    console.error("Error approving training:", err);
    res.status(500).json({ error: "Failed to approve training" });
  }
};
const declineTraining = async (req, res) => {
  try {
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ error: "Training not found" });
    training.approved = false;
    await training.save();
    res.json(training);
  } catch (err) {
    console.error("Error declining training:", err);
    res.status(500).json({ error: "Failed to decline training" });
  }
};
const getTrainingByClient = async (req, res) => {
  try {
    const training = await Training.find({ client: req.params.clientId });
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.json(training);
  } catch (err) {
    console.error("Error getting training by client:", err);
    res.status(500).json({ error: "Failed to get training by client" });
  }
};
const getTrainingByTrainer = async (req, res) => {
  try {
    const training = await Training.find({ trainer: req.params.trainerId });
    if (!training) return res.status(404).json({ error: "Training not found" });
    res.json(training);
  } catch (err) {
    console.error("Error getting training by trainer:", err);
    res.status(500).json({ error: "Failed to get training by trainer" });
  }
};

module.exports = {
  createTraining,
  getAllTrainings,
  getTraining,
  updateTraining,
  deleteTraining,
  approveTraining,
  declineTraining,
  getTrainingByClient,
  getTrainingByTrainer,
};
