<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>May</h2>
    </div>

    <div class="chat-body" ref="chatBody">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          'chat-bubble',
          msg.from === currentUser ? 'right' : 'left',
          msg.from, // keep style (color)
        ]"
      >
        <img v-if="msg.from !== currentUser" src="@/assets/riyani.avif" class="avatar" />
        <div class="message">{{ msg.text }}</div>
        <img v-if="msg.from === currentUser" src="@/assets/may.avif" class="avatar" />
      </div>
    </div>

    <div class="chat-input">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Throw a message..."
      />
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from "vue";
import { socket } from "../socket";

const currentUser = "may";

const messages = ref([
  { from: "riyani", text: "Assalamu'alaikum" },
  { from: "may", text: "Wa'alaikumsalam" },
]);

const newMessage = ref("");
const chatBody = ref(null);

function sendMessage() {
  const textToSend = newMessage.value.trim();

  if (textToSend) {
    socket.emit("messagewebsocket", {
      from: "may",
      text: textToSend,
    });

    newMessage.value = "";

    nextTick(() => {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
    });
  }
}

function handleServerMessage(data) {
  console.log("CLIENT RECEIVED:", data);
  messages.value.push(data);

  nextTick(() => {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  });
}

onMounted(() => {
  socket.on("messagewebsocket", handleServerMessage);
});

onUnmounted(() => {
  socket.off("messagewebsocket", handleServerMessage);
});
</script>

<style lang="sass" scoped>
@use "@/assets/styles/chatRoom.sass";
</style>
