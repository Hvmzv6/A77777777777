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
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const { trainingValidation } = require("../validations/trainingValidation");

// Create a new training session
router.post(
  "/trainings",
  verifyToken,
  requireRole(["admin", "trainer", "client"]), // Add 'client' to allowed roles
  validateBody(trainingValidation),
  createTraining
);

// Get all training sessions
router.get(
  "/trainings",
  verifyToken,
  requireRole("admin", "client"), // Only admins can view all trainings
  getAllTrainings
);

// Get a specific training session by ID
router.get(
  "/trainings/:id",
  verifyToken,
  // Any authenticated user can view a specific training, but controllers should filter data based on role
  getTraining
);

// Update a specific training session by ID
router.put(
  "/trainings/:id",
  verifyToken,
  requireRole(["admin", "trainer", "client"]),
  validateBody(trainingValidation),
  updateTraining
);

// Delete a specific training session by ID
router.delete(
  "/trainings/:id",
  verifyToken,
  requireRole("admin", "client"), // Only admins can delete trainings
  deleteTraining
);

// Fix duplicate routes: adding different path for approve and decline
router.put(
  "/trainings/:id/approve",
  verifyToken,
  requireRole("admin"), // Only admins can approve trainings
  approveTraining
);

// Reject a specific training session by ID
router.put(
  "/trainings/:id/decline",
  verifyToken,
  requireRole("admin"), // Only admins can decline trainings
  declineTraining
);

router.get(
  "/trainings/client/:clientId",
  verifyToken,
  requireRole(["admin", "client"]), // Admins and the specific client can view client trainings
  getTrainingByClient
);

router.get(
  "/trainings/trainer/:trainerId",
  verifyToken,
  requireRole(["admin", "trainer"]), // Admins and the specific trainer can view trainer trainings
  getTrainingByTrainer
);

module.exports = router;
