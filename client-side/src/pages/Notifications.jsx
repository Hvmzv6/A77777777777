import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNotification } from "../hooks/useNotification";
import { approveTraining, declineTraining } from "../store/training/action";

const Notifications = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    clearNotification,
    clearAllNotifications,
    loadNotifications,
  } = useNotification();

  useEffect(() => {
    // Refresh notifications when drawer opens
    if (open) {
      loadNotifications();
    }
  }, [open, loadNotifications]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleApprove = (trainingId) => {
    dispatch(approveTraining(trainingId));
    // Mark notification as read after approving
    markAsRead(trainingId);
  };

  const handleDecline = (trainingId) => {
    dispatch(declineTraining(trainingId));
    // Mark notification as read after declining
    markAsRead(trainingId);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={toggleDrawer(true)}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 350, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6">Notifications</Typography>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          {loading ? (
            <Typography variant="body2" sx={{ textAlign: "center", p: 2 }}>
              Loading notifications...
            </Typography>
          ) : error ? (
            <Typography
              variant="body2"
              color="error"
              sx={{ textAlign: "center", p: 2 }}
            >
              Error loading notifications: {error}
            </Typography>
          ) : notifications.length > 0 ? (
            <>
              <Button
                onClick={clearAllNotifications}
                variant="outlined"
                size="small"
                sx={{ mb: 2 }}
              >
                Clear All
              </Button>

              <List>
                {notifications.map((notification) => (
                  <React.Fragment key={notification._id || Math.random()}>
                    <ListItem
                      onClick={() => handleNotificationClick(notification)}
                      sx={{
                        backgroundColor: notification.isRead
                          ? "transparent"
                          : "rgba(25, 118, 210, 0.08)",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(25, 118, 210, 0.12)",
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography variant="subtitle2" component="div">
                            {notification.message}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="caption" display="block">
                              {notification.title}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {notification.createdAt &&
                                format(
                                  new Date(notification.createdAt),
                                  "MMM dd, yyyy HH:mm"
                                )}
                            </Typography>

                            {user &&
                              user.role === "admin" &&
                              notification.type === "trainingRequest" && (
                                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<CheckCircleIcon />}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApprove(notification.entityId);
                                    }}
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    startIcon={<CancelIcon />}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDecline(notification.entityId);
                                    }}
                                  >
                                    Decline
                                  </Button>
                                </Box>
                              )}

                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                clearNotification(notification._id);
                              }}
                              sx={{ position: "absolute", top: 8, right: 8 }}
                            >
                              <CloseIcon fontSize="small" />
                            </IconButton>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </>
          ) : (
            <Typography variant="body2" sx={{ textAlign: "center", p: 2 }}>
              No notifications
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Notifications;
