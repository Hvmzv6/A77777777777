// routes/notificationRoutes.js
const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { verifyToken, requireRole } = require("../middlewares/authMiddleware");

// Route order matters! More specific routes first
router.get(
  "/receiver/:receiverId",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.getNotificationsByReceiver
);
router.get(
  "/sender/:senderId",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.getNotificationsBySender
);

// Basic CRUD routes
router.post(
  "/",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.createNotification
);
router.get(
  "/",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.getAllNotifications
);
router.get(
  "/:id",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.getNotification
);
router.put(
  "/:id/read",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.markAsRead
);
router.delete(
  "/",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.deleteAllNotifications
);
router.delete(
  "/:id",
  verifyToken,
  requireRole(["admin", "client"]),
  notificationController.deleteNotification
);

module.exports = router;
