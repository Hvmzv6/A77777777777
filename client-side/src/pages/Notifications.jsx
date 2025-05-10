import React from "react";

const Notifications = () => {
  //   const [notifications, setNotifications] = useState([]);

  //   useEffect(() => {
  //     // Replace 'ws://your-websocket-server' with your WebSocket server URL
  //     const socket = new WebSocket("ws://your-websocket-server");

  //     // Handle connection open
  //     socket.onopen = () => {
  //       console.log("WebSocket connection established");
  //     };

  //     // Handle incoming messages
  //     socket.onmessage = (event) => {
  //       const newNotification = JSON.parse(event.data);
  //       setNotifications((prev) => [...prev, newNotification]);
  //     };

  //     // Handle connection close
  //     socket.onclose = () => {
  //       console.log("WebSocket connection closed");
  //     };

  //     // Handle errors
  //     socket.onerror = (error) => {
  //       console.error("WebSocket error:", error);
  //     };

  //     // Cleanup on component unmount
  //     return () => {
  //       socket.close();
  //     };
  //   }, []);

  return (
    <div>
      <h1>Notifications</h1>
      {/* <ul>
            {notifications.map((notification, index) => (
          <li key={index}>{notification.message}</li>
         ))}
       </ul> */}
    </div>
  );
};

export default Notifications;
