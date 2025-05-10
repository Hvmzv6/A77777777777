const express = require("express");
const { generateAttestation } = require("../controllers/attestationController");
const { requireRole, verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/generate",
  verifyToken,
  requireRole("admin"), // Only admins generate attestations
  generateAttestation
);

module.exports = router;
