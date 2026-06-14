import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // Get user from local storage safely
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    // Only connect if user exists
    const userId = user?.id || user?._id;
    if (!userId) return;

    // Use environment variable or fallback to local backend port
    const backendUrl =
      import.meta.env.VITE_BACKEND_URL ||
      "https://elena-backend-eaoh.onrender.com";

    const socketInstance = io(backendUrl, {
      query: { id: userId },
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
