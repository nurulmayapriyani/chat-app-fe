import { defineStore } from "pinia";
import { socket } from "../socket";

interface ConnectionState {
  isConnected: boolean;
}

export const useConnectionStore = defineStore("connection", {
  state: (): ConnectionState => ({
    isConnected: false,
  }),

  actions: {
    bindEvents() {
      socket.on("connect", () => {
        this.isConnected = true;
      });

      socket.on("disconnect", () => {
        this.isConnected = false;
      });
    },

    connect() {
      socket.connect();
    },
  },
});
