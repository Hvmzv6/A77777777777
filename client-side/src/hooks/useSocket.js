import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import {
  createNotification,
  fetchNotifications,
} from "../store/notification/action";

// Initialize socket connection (single instance)
const socket = io("http://localhost:5000", {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export const useSocket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?._id) return;

    // Define notification handler based on user role
    const handleNotification = (data) => {
      console.log("Notification received:", data);
      dispatch(createNotification(data));
      // Refresh notifications list
      dispatch(fetchNotifications(user._id));
    };

    // Listen for events based on role
    if (user.role === "admin") {
      socket.on("newTrainingRequest", handleNotification);
    } else {
      socket.on("trainingStatusUpdate", handleNotification);
    }

    // General notification event for all users
    socket.on("newNotification", handleNotification);

    // Emit user connection event to server
    socket.emit("userConnected", { userId: user._id, role: user.role });

    // Cleanup on unmount or user change
    return () => {
      if (user.role === "admin") {
        socket.off("newTrainingRequest", handleNotification);
      } else {
        socket.off("trainingStatusUpdate", handleNotification);
      }
      socket.off("newNotification", handleNotification);
    };
  }, [dispatch, user?._id, user?.role]);

  return { socket };
};
