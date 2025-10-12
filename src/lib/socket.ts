import { io, Socket } from "socket.io-client";
import { Endpoint } from "../configs/url.config";

export type PresenceStats = Record<string, number>;

type ServerToClientEvents = {
  "presence:stats": (data: PresenceStats) => void;
};

type ClientToServerEvents = {
  "presence:join": (room: string) => void;
};

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  Endpoint,
  {
    transports: ["websocket"],      // เร็ว/เสถียรกว่าใน dev ส่วนใหญ่
    autoConnect: true,
    reconnection: true,
    withCredentials: true,
  }
);

// (อุปกรณ์เสริม) log สถานะ
//socket.on("connect", () => console.log("socket connected:", socket.id));
//socket.on("disconnect", (reason) => console.log("socket disconnected:", reason));