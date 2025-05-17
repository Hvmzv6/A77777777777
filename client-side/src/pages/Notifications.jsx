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
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import { approveTraining, declineTraining } from "../store/training/action";

const Notifications = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    notifications,
    unreadCount,
    markAsRead,
    clearNotification,
    clearAllNotifications,
  } = useSocket();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleApprove = (trainingId) => {
    dispatch(approveTraining(trainingId));
    clearNotification(trainingId);
  };

  const handleDecline = (trainingId) => {
    dispatch(declineTraining(trainingId));
    clearNotification(trainingId);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
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

          {notifications.length > 0 ? (
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
                        backgroundColor: notification.read
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
                              {notification.timestamp &&
                                format(
                                  new Date(notification.timestamp),
                                  "MMM dd, yyyy HH:mm"
                                )}
                            </Typography>
                            {user.role === "admin" &&
                              notification.status === "pending" && (
                                <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                                  <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    startIcon={<CheckCircleIcon />}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApprove(notification._id);
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
                                      handleDecline(notification._id);
                                    }}
                                  >
                                    Decline
                                  </Button>
                                </Box>
                              )}
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
