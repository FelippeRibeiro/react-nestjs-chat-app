import { Socket } from "socket.io-client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const userStore = create<UserStore>((set) => {
  return {
    socket: null,
    user: { name: "", email: "", token: "", id: "" },
    setUser: (user) => set(() => ({ user })),
    setSocket: (socket) => set((state) => ({ socket })),
  };
});

type User = {
  name: string;
  email: string;
  token: any;
  id: string;
};

type UserStore = {
  socket: Socket | null;
  user: User;
  setUser: (user: User) => void;
  setSocket: (socket: Socket) => void;
};
