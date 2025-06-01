import { reactive } from "vue";
import { io, Socket } from "socket.io-client";

interface State {
  connected: boolean;
  fooEvents: any[]; // You can replace `any` with a more specific type if known
  barEvents: any[];
}

export const state = reactive<State>({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

const URL: string | undefined = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket: Socket = io(URL, { autoConnect: false }
// Solution of Temporary Disconnections
// {
//   autoConnect: false,
//   reconnection: true,             // ✅ Enables automatic reconnection
//   reconnectionAttempts: 5,        // 🔁 Retry up to 5 times
//   reconnectionDelay: 1000         // 🕐 Wait 1s between each retry
// }

);

// Solution of Hot Module Reload (HMR) problem

// if (import.meta.hot) {
//   import.meta.hot.accept(() => {
//     window.location.reload();
//   });
// }

// // Ensure no duplicate handlers before adding new ones
// socket.removeAllListeners();


// Socket event handlers
socket.on("connect", () => {
  state.connected = true;

  // Solution of Temporary Disconnections

  // // ✅ Re-fetch or re-sync critical data on reconnection
  // socket.emit("item:list", (res: any) => {
  //   state.fooEvents = res.data;
  // });
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("foo", (...args: any[]) => {
  state.fooEvents.push(args);
});

socket.on("bar", (...args: any[]) => {
  state.barEvents.push(args);
});
