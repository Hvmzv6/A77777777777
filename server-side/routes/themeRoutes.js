const express = require("express");
const router = express.Router();
const {
  createTheme,
  getAllThemes,
  getTheme,
  updateTheme,
  deleteTheme,
} = require("../controllers/themeController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const { themeValidation } = require("../validations/themeValidation");

// Create a new theme
router.post(
  "/themes",
  authMiddleware.verifyToken, // Verify token
  validateBody(themeValidation), // Validate request body
  createTheme
);

// Get all themes
router.get(
  "/themes",
  authMiddleware.verifyToken, // Verify token
  getAllThemes
);

// Get a specific theme by ID
router.get(
  "/themes/:id",
  authMiddleware.verifyToken, // Verify token
  getTheme
);

// Update a specific theme by ID
router.put(
  "/themes/:id",
  authMiddleware.verifyToken, // Verify token
  validateBody(themeValidation), // Validate request body
  updateTheme
);

// Delete a specific theme by ID
router.delete(
  "/themes/:id",
  authMiddleware.verifyToken, // Verify token
  deleteTheme
);

module.exports = router;
