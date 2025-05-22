const Training = require("../models/trainingModel");

const createTraining = async (req, res) => {
  try {
    const {
      ref,
      status = "pending",
      theme,
      title,
      startDate,
      endDate,
      trainer,
      trainerPhone,
      CIN,
      client,
      clientPhone,
      participants = [],
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

    // Notify all admins about new training request
    const io = req.app.get("io");
    io.to("admin").emit("newTrainingRequest", {
      _id: savedTraining._id,
      ref: savedTraining.ref,
      title: savedTraining.title,
      trainer: savedTraining.trainer,
      client: savedTraining.client,
      status: savedTraining.status,
      message: `New training request: ${savedTraining.title}`,
      timestamp: new Date(),
    });
    // ...after saving new training by trainer...
    // Notify the trainer about the new training request
    io.to("admin").emit("trainerAddedProgram", {
      _id: savedTraining._id,
      ref: savedTraining.ref,
      title: savedTraining.title,
      trainer: savedTraining.trainer,
      client: savedTraining.client,
      message: `Trainer added a new program: ${savedTraining.title}`,
      timestamp: new Date(),
    });
    io.to(savedTraining.client.toString()).emit("trainerAddedProgram", {
      _id: savedTraining._id,
      ref: savedTraining.ref,
      title: savedTraining.title,
      trainer: savedTraining.trainer,
      message: `A new program "${savedTraining.title}" has been added for you.`,
      timestamp: new Date(),
    });
    res.status(201).json({
      message: "Training request created successfully",
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

const deleteTraining = async (req, adminres) => {
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
    training.status = "confirmed";
    await training.save();
    const io = req.app.get("io");
    io.to(training.client.toString()).emit("trainingStatusUpdate", {
      _id: training._id,
      ref: training.ref,
      title: training.title,
      status: training.status,
      approved: training.approved,
      message: `Your training request "${training.title}" has been approved.`,
      timestamp: new Date(),
    });
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
    training.status = "cancelled";
    await training.save();

    // Notify client about declined training
    const io = req.app.get("io");
    io.to(training.client.toString()).emit("trainingStatusUpdate", {
      _id: training._id,
      ref: training.ref,
      title: training.title,
      status: training.status,
      approved: training.approved,
      message: `Your training request "${training.title}" has been declined.`,
      timestamp: new Date(),
    });

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
