const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const {
  userCreateValidation,
  userUpdateValidation,
} = require("../validations/userValidation");

const router = express.Router();

// User CRUD routes (protected)
router.post(
  "/users/register",
  verifyToken,
  requireRole("admin"), // Only admins can register new users
  validateBody(userCreateValidation),
  userController.registerUser
);

router.get("/users", verifyToken, userController.getAllUsers);

router.get(
  "/users/:id",
  verifyToken,
  requireRole(["admin", "trainer"]), // Admins and trainers can view user details
  userController.getUser
);

router.put(
  "/users/:id",
  verifyToken,
  requireRole("admin"), // Only admins can update users
  validateBody(userUpdateValidation),
  userController.updateUser
);

router.delete(
  "/users/:id",
  verifyToken,
  requireRole("admin"), // Only admins can delete users
  userController.deleteUser
);

module.exports = router;
