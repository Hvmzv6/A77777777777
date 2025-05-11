const express = require("express");
const router = express.Router();
const {
  createTheme,
  getAllThemes,
  getTheme,
  updateTheme,
  deleteTheme,
} = require("../controllers/themeController");

const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const { themeValidation } = require("../validations/themeValidation");

// Create a new theme
router.post(
  "/themes",
  verifyToken,
  requireRole(["admin", "trainer"]), // Only admins and trainers can create themes
  validateBody(themeValidation),
  createTheme
);

// Get all themes
router.get(
  "/themes",
  verifyToken,
  // All authenticated users can view themes
  getAllThemes
);

// Get a specific theme by ID
router.get(
  "/themes/:id",
  verifyToken,
  // All authenticated users can view a specific theme
  getTheme
);

// Update a specific theme by ID
router.put(
  "/themes/:id",
  verifyToken,
  requireRole(["admin", "trainer"]), // Only admins and trainers can update themes
  validateBody(themeValidation),
  updateTheme
);

// Delete a specific theme by ID
router.delete(
  "/themes/:id",
  verifyToken,
  requireRole("admin"), // Only admins can delete themes
  deleteTheme
);

module.exports = router;
