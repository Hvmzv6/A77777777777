const express = require("express");
const router = express.Router();
const {
  createTraining,
  getAllTrainings,
  getTraining,
  updateTraining,
  deleteTraining,
  approveTraining,
  declineTraining,
  getTrainingByClient,
  getTrainingByTrainer,
} = require("../controllers/trainingController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const { trainingValidation } = require("../validations/trainingValidation");

// Create a new training session
router.post(
  "/trainings",
  authMiddleware.verifyToken, // Verify token
  validateBody(trainingValidation), // Validate request body
  createTraining
);

// Get all training sessions
router.get(
  "/trainings",
  authMiddleware.verifyToken, // Verify token
  getAllTrainings
);

// Get a specific training session by ID
router.get(
  "/trainings/:id",
  authMiddleware.verifyToken, // Verify token
  getTraining
);

// Update a specific training session by ID
router.put(
  "/trainings/:id",
  authMiddleware.verifyToken, // Verify token
  validateBody(trainingValidation), // Validate request body
  updateTraining
);

// Delete a specific training session by ID
router.delete(
  "/trainings/:id",
  authMiddleware.verifyToken, // Verify token
  deleteTraining
);
router.put(
  "/trainings/:id",
  authMiddleware.verifyToken, // Verify token
  approveTraining
);
// Reject a specific training session by ID
router.put(
  "/trainings/:id",
  authMiddleware.verifyToken, // Verify token
  declineTraining
);
router.get(
  "/trainings/client/:clientId",
  authMiddleware.verifyToken, // Verify token
  getTrainingByClient
);
router.get(
  "/trainings/trainer/:trainerId",
  authMiddleware.verifyToken, // Verify token
  getTrainingByTrainer
);
module.exports = router;
