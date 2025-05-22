// controllers/notificationController.js
const Notification = require("../models/notificationModel");

// Create a notification
exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all notifications
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a notification by ID
exports.getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notifications for a specific receiver
exports.getNotificationsByReceiver = async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiver: req.params.receiverId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get notifications from a specific sender
exports.getNotificationsBySender = async (req, res) => {
  try {
    const notifications = await Notification.find({
      sender: req.params.senderId,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json(notification);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a notification
exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all notifications
exports.deleteAllNotifications = async (req, res) => {
  try {
    // Optional: You can filter by user if needed
    // const userId = req.user._id;
    // await Notification.deleteMany({ receiver: userId });

    await Notification.deleteMany({});
    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
