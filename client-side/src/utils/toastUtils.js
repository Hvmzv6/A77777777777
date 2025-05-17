import { CheckCircle, Info, XCircle } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import CustomToast from "../components/CustomToast"; // adjust path as needed

const getIcon = (type) => {
  switch (type) {
    case "success":
      return React.createElement(CheckCircle, {
        size: 20,
        className: "text-green-500",
      });
    case "error":
      return React.createElement(XCircle, {
        size: 20,
        className: "text-red-500",
      });
    default:
      return React.createElement(Info, {
        size: 20,
        className: "text-blue-500",
      });
  }
};

export const showToast = (message, type = "default", duration = 4000) => {
  toast.custom(
    () => {
      const icon = getIcon(type);
      return React.createElement(CustomToast, {
        message,
        icon,
        type,
      });
    },
    { duration }
  );
};
