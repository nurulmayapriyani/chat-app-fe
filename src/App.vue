<script setup lang="ts">
import { onMounted } from "vue";
import { socket } from "./socket";

import ChatRoomRiyani from "./components/ChatRoomRiyani.vue";
import CHatRoomMay from "./components/ChatRoomMay.vue";
import ConnectionManager from "./components/ConnectionManager.vue";

onMounted(() => {
  socket.connect(); // ✅ AUTO CONNECT
});
</script>

<template>
  <!-- <ConnectionManager /> -->

  <main class="chat-wrapper">
    <ChatRoomRiyani />
    <CHatRoomMay />
  </main>
</template>

<style scoped>
@media (min-width: 1024px) {
  h1 {
    color: black;
  }

  .chat-wrapper {
    display: flex;
    gap: 20px;
    justify-content: center;
  }
}
</style>
