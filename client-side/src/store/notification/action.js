import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API base URL
const API_URL = "http://localhost:5000/api";

// Helper function to create authenticated headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// Get all notifications (can be filtered by role via backend)
export const fetchNotifications = createAsyncThunk(
  "notifications/FETCH_ALL",
  async (_, { rejectWithValue }) => {
    try {
      // Get current user role from state if available

      const response = await axios.get(`${API_URL}/notifications`, {
        headers: getAuthHeaders(),
      });

      return response.data;
    } catch (error) {
      console.error("Fetch notifications error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch notifications"
      );
    }
  }
);

// Get notifications by receiver (useful for client role)
export const fetchNotificationsByReceiver = createAsyncThunk(
  "notifications/FETCH_BY_RECEIVER",
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/receiver/${receiverId}`,
        { headers: getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Fetch notifications by receiver error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch notifications"
      );
    }
  }
);

// Get notifications by sender (useful for admin/trainer role)
export const fetchNotificationsBySender = createAsyncThunk(
  "notifications/FETCH_BY_SENDER",
  async (senderId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/sender/${senderId}`,
        { headers: getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Fetch notifications by sender error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch notifications"
      );
    }
  }
);

// Get notification by ID
export const fetchNotificationById = createAsyncThunk(
  "notifications/FETCH_BY_ID",
  async (notificationId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/notifications/${notificationId}`,
        { headers: getAuthHeaders() }
      );

      return response.data;
    } catch (error) {
      console.error("Fetch notification by ID error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch notification"
      );
    }
  }
);

// Create a new notification
export const createNotification = createAsyncThunk(
  "notifications/CREATE",
  async (notificationData, { rejectWithValue, getState }) => {
    try {
      const notificationsState = getState().notifications.notifications || [];

      const response = await axios.post(
        `${API_URL}/notifications`,
        notificationData,
        { headers: getAuthHeaders() }
      );

      return [...notificationsState, response.data];
    } catch (error) {
      console.error("Create notification error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to create notification"
      );
    }
  }
);

// Mark notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/MARK_AS_READ",
  async (notificationId, { rejectWithValue, getState }) => {
    try {
      const notificationsState = getState().notificationsReducer.data || [];

      const response = await axios.put(
        `${API_URL}/notifications/${notificationId}/read`,
        {},
        { headers: getAuthHeaders() }
      );

      // Update the notification in the state
      return notificationsState.map((notification) =>
        notification._id === notificationId ? response.data : notification
      );
    } catch (error) {
      console.error("Mark notification as read error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to mark notification as read"
      );
    }
  }
);

// Delete a notification
export const deleteNotification = createAsyncThunk(
  "notifications/DELETE",
  async (notificationId, { rejectWithValue, getState }) => {
    try {
      const notificationsState = getState().notificationsReducer.data || [];

      await axios.delete(`${API_URL}/notifications/${notificationId}`, {
        headers: getAuthHeaders(),
      });

      // Filter out the deleted notification
      return notificationsState.filter(
        (notification) => notification._id !== notificationId
      );
    } catch (error) {
      console.error("Delete notification error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete notification"
      );
    }
  }
);

// Delete all notifications - with optional filter by user role
export const deleteAllNotifications = createAsyncThunk(
  "notifications/DELETE_ALL",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/notifications`, {
        headers: getAuthHeaders(),
      });

      return [];
    } catch (error) {
      console.error("Delete all notifications error:", error);
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete all notifications"
      );
    }
  }
);

// Helper actions for state management
export const handleSelectAction = (state, action) => {
  const findSelected = state.notifications?.find(
    (n) => n._id === action.payload
  );
  state.selectedNotification = findSelected || null;
};

export const handleClearSelectedAction = (state) => {
  state.selectedNotification = null;
};
