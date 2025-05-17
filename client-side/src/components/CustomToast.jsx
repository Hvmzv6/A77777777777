import { useSelector } from "react-redux";

const CustomToast = ({ message, icon, type = "default" }) => {
  const darkMode = useSelector((state) => state.global.mode === "dark");

  const colors = {
    success: "text-green-500",
    error: "text-red-500",
    default: "text-blue-500",
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-md shadow-lg transition-all duration-300 ${
        darkMode ? "bg-[#444] text-white" : "bg-white text-black"
      }`}
    >
      {icon && <span className={colors[type]}>{icon}</span>}
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default CustomToast;
