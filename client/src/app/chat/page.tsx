"use client";

import Connecteds from "@/components/connections";
import { userStore } from "@/context/user";
import { useSocket } from "@/hooks/socket";
import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Page() {
  const { server } = useSocket();
  const { socket } = userStore();
  console.log(socket);

  return (
    <div className="flex min-h-screen">
      <Connecteds />
      <main className="flex flex-col w-full items-center justify-between p-10">
        <h1>Chat</h1>
      </main>
    </div>
  );
}
