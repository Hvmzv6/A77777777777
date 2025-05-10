const express = require("express");
const router = express.Router();
const {
  createParticipant,
  getAllParticipants,
  getParticipant,
  getParticipantsByProgram,
  updateParticipant,
  deleteParticipant,
  getParticipantsByClient,
} = require("../controllers/participantController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const {
  ParticipantValidation,
} = require("../validations/participantValidation");

// Create a new training session
router.post(
  "/participants",
  authMiddleware.verifyToken, // Verify token
  validateBody(ParticipantValidation), // Validate request body
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
  validateBody(ParticipantValidation), // Validate request body
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
router.get(
  "/clients/:clientId/participants",
  authMiddleware.verifyToken, // Verify token
  getParticipantsByClient
);
module.exports = router;
