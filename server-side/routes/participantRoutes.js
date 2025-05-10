const express = require("express");
const router = express.Router();
const {
  createParticipant,
  getAllParticipants,
  getParticipant,
  getParticipantsByProgram,
  updateParticipant,
  deleteParticipant,
} = require("../controllers/participantController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const {
  participantValidation,
} = require("../validations/participantValidation");

// Create a new training session
router.post(
  "/participants",
  authMiddleware.verifyToken, // Verify token
  validateBody(participantValidation), // Validate request body
  createParticipant
);

// Get all training sessions
router.get(
  "/participants",
  authMiddleware.verifyToken, // Verify token
  getAllParticipants
);

// Get a specific training session by ID
router.get(
  "/participants/:id",
  authMiddleware.verifyToken, // Verify token
  getParticipant
);

// Update a specific training session by ID
router.put(
  "/participants/:id",
  authMiddleware.verifyToken, // Verify token
  validateBody(participantValidation), // Validate request body
  updateParticipant
);

// Delete a specific training session by ID
router.delete(
  "/participants/:id",
  authMiddleware.verifyToken, // Verify token
  deleteParticipant
);
router.get(
  "/trainings/:Id/participants",
  authMiddleware.verifyToken,
  getParticipantsByProgram
);

module.exports = router;
