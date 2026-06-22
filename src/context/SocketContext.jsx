import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userId, setUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.id || user?._id;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const currentId = user?.id || user?._id;
      if (currentId !== userId) {
        setUserId(currentId);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    // Only connect if user exists
    if (!userId) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // Use environment variable and strip the /api/v1 path for socket connection
    const baseUrl = import.meta.env.VITE_BASE_URL || "";
    const backendUrl = baseUrl.replace(/\/api\/v1\/?$/, "");

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
  }, [userId]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
