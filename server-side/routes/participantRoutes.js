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

const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const {
  ParticipantValidation,
} = require("../validations/participantValidation");

// Create a new participant
router.post(
  "/participants",
  verifyToken,
  requireRole(["admin", "trainer", "client"]), // All roles can create participants, but controllers should validate role-specific access
  validateBody(ParticipantValidation),
  createParticipant
);

// Get all participants
router.get(
  "/participants",
  verifyToken,
  requireRole("admin"), // Only admins can view all participants
  getAllParticipants
);

// Get a specific participant by ID
router.get(
  "/participants/:id",
  verifyToken,
  requireRole(["admin", "trainer"]), // Admins and trainers can view specific participants
  getParticipant
);

// Update a specific participant by ID
router.put(
  "/participants/:id",
  verifyToken,
  requireRole(["admin", "trainer"]), // Admins and trainers can update participants
  validateBody(ParticipantValidation),
  updateParticipant
);

// Delete a specific participant by ID
router.delete(
  "/participants/:id",
  verifyToken,
  requireRole("admin"), // Only admins can delete participants
  deleteParticipant
);

router.get(
  "/trainings/:Id/participants",
  verifyToken,
  requireRole(["admin", "trainer"]), // Admins and trainers can view participants by program
  getParticipantsByProgram
);

router.get(
  "/clients/:clientId/participants",
  verifyToken,
  requireRole(["admin", "client"]), // Admins and the specific client can view client participants
  getParticipantsByClient
);

module.exports = router;
