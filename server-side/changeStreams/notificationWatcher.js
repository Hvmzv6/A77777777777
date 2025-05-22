const Notification = require("../models/notificationModel");

function startNotificationWatcher() {
  const changeStream = Notification.watch([
    {
      $match: { operationType: "insert" },
    },
  ]);

  changeStream.on("change", async (change) => {
    console.log("🔔 Change detected in Notification collection");

    if (change.operationType === "insert") {
      const newNotification = change.fullDocument;

      console.log("📥 New Notification Inserted:", newNotification);
    }
  });

  console.log("✅ Notification watcher started.");
}

module.exports = startNotificationWatcher;
