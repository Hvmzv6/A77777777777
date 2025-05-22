import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllNotifications,
  deleteNotification,
  fetchNotifications,
  markNotificationAsRead,
} from "../store/notification/action";
import { useSocket } from "./useSocket";

export const useNotification = () => {
  const dispatch = useDispatch();
  const {
    data: notifications,
    loading,
    error,
  } = useSelector((state) => state.notificationsReducer);
  console.log("🚀 ~ useNotification ~ notifications:", notifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Memoize the loadNotifications function so it doesn't change on each render
  const loadNotifications = useCallback(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useSocket(); // Initialize socket listeners for real-time updates

  // Load notifications when component mounts
  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]); // Now we can safely include it in dependencies

  const markAsRead = useCallback(
    (notificationId) => {
      dispatch(markNotificationAsRead(notificationId));
    },
    [dispatch]
  );

  const clearNotification = useCallback(
    (notificationId) => {
      dispatch(deleteNotification(notificationId));
    },
    [dispatch]
  );

  const clearAllNotifications = useCallback(() => {
    dispatch(deleteAllNotifications());
  }, [dispatch]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    loadNotifications,
    markAsRead,
    clearNotification,
    clearAllNotifications,
  };
};

// Default export for compatibility
export default useNotification;
