import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import socket from "../socket";
export const useSocket = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("userRole");

  // Initialize socket connection
  useEffect(() => {
    if (!userId) return;

    // Connect to socket server

    // Listen for different events based on role
    // if (user.role === "admin") {
    //   socket.on("newTrainingRequest", (data) => {
    //     console.log("New training request received:", data);
    //     setNotifications((prev) => [data, ...prev]);
    //     // Refresh training list
    //     dispatch(getTraining());
    //   });
    // } else {
    //   socket.on("trainingStatusUpdate", (data) => {
    //     console.log("Training status update received:", data);
    //     setNotifications((prev) => [data, ...prev]);
    //     // Refresh training list
    //     dispatch(getTraining());
    //   });
    // }
  }, [userId, role, dispatch]);

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification._id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Clear a notification
  const clearNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification._id !== notificationId)
    );
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    socket,
    notifications,
    unreadCount: notifications.filter((n) => !n.read).length,
    markAsRead,
    clearNotification,
    clearAllNotifications,
  };
};
