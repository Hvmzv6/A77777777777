const express = require("express");
const { changePassword, login } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/change-password", verifyToken, changePassword);

module.exports = router;
