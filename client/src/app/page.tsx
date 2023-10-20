"use client";
import { userStore } from "@/context/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Home() {
  const [server, setServer] = useState<Socket>();
  useEffect(() => {
    const socket = io("http://localhost:3001");

    if (!server) setServer(socket);
    return () => {
      console.log("Desconectando");
      socket.close();
    };
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>My Chat APP</h1>
      <button
        onClick={() => {
          if (server) server.emit("message", { message: "hello" });
        }}
      >
        Send
      </button>
    </main>
  );
}
