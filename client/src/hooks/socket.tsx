import { userStore } from "@/context/user";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export function useSocket() {
  const setSocket = userStore((state) => state.setSocket);
  const [server, setServer] = useState<Socket>();

  useEffect(() => {
    const socket = io("http://localhost:3001", {
      auth: {
        token: "token foda",
      },
    });

    socket.on("updateconnections", (data) => {
      console.log(data);
    });

    if (!server) {
      setServer(socket);
      setSocket(socket);
    }
    return () => {
      socket.close();
    };
  }, []);

  return { server };
}
