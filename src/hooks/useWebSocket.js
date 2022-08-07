import { useEffect, useState } from "react";

const useWebSocket = ({ onMessage }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    return () => {
      if (socket) socket.close();
    };
  }, []);

  const connect = () => {
    return new Promise((res, rej) => {
      const newSocket = new WebSocket("ws://localhost:8080");

      newSocket.onopen = () => {
        res(newSocket);
        setSocket(newSocket);
      };

      newSocket.onerror = () => {
        rej();
      };

      newSocket.onmessage = ({ data }) => {
        onMessage?.(JSON.parse(data));
      };
    });
  };

  return {
    connect,
    socket: socket ?? {},
  };
};

export default useWebSocket;
