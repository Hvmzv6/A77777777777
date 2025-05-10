const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateBody = require("../middlewares/validateBody");
const {
  userCreateValidation,
  userUpdateValidation,
} = require("../validations/userValidation");

const router = express.Router();

// User CRUD routes (protected)
router.post(
  "/users/register",
  authMiddleware.verifyToken,
  validateBody(userCreateValidation),
  userController.registerUser
);

router.get("/users", authMiddleware.verifyToken, userController.getAllUsers);
router.get("/users/:id", authMiddleware.verifyToken, userController.getUser);
router.put(
  "/users/:id",
  authMiddleware.verifyToken,
  validateBody(userUpdateValidation),
  userController.updateUser
);
router.delete(
  "/users/:id",
  authMiddleware.verifyToken,
  userController.deleteUser
);

module.exports = router;
