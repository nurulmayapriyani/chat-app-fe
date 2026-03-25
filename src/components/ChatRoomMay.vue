<template>
  <div class="chat-container">
    <div class="chat-header">
      <h2>Riyani</h2>
    </div>

    <div class="chat-body" ref="chatBody">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-bubble', msg.from === 'may' ? 'may' : 'riyani']"
      >
        <img v-if="msg.from === 'riyani'" src="@/assets/riyani.avif" class="avatar" /> 
        <div v-if="msg.from === 'riyani'"class="message">{{ msg.text }}</div>

        <div v-if="msg.from === 'may'" class="message">{{ msg.text }}</div>
        <img v-if="msg.from === 'may'" src="@/assets/may.avif" class="avatar" />
      </div>
    </div>

    <div class="chat-input">
      <!-- <input v-model="newMessage" ref="chatInput" @keyup.enter="sendMessage" placeholder="Throw a message..."/> -->
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Throw a message..."/>
      <button @click="sendMessage">➤</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue';
import { socket } from '../socket';

const messages = ref([
  { from: 'riyani', text: "Assalamu'alikum" },
  { from: 'may', text: "Wa'alaikumsalam" },
]);

// const chatInput = ref(null);
const newMessage = ref('');
const chatBody = ref(null);

function sendMessage() {
  const textToSend = newMessage.value.trim();

  if (textToSend) {
    messages.value.push({ from: 'may', text: newMessage.value });

    socket.emit('messagewebsocket', newMessage.value); // no callback now
    // messages.value.push({ from: 'may', text: textToSend });

    // // Emit the message to the server via WebSocket
    // socket.emit('messagewebsocket', textToSend, (response) => {
    //   // This callback handles server's response
    //   messages.value.push({ from: 'riyani', text: response });
    // });

    newMessage.value = '';
    nextTick(() => {
      chatBody.value.scrollTop = chatBody.value.scrollHeight;
      // chatInput.value?.focus();
    });
  }

  function handleServerMessage(data) {
  messages.value.push({ from: 'riyani', text: data });
  nextTick(() => {
    chatBody.value.scrollTop = chatBody.value.scrollHeight;
  });
  }

  onMounted(() => {
    // If your server sends back messages with the same event name
    socket.on('messagewebsocket', handleServerMessage);
  });

  onUnmounted(() => {
    socket.off('messagewebsocket', handleServerMessage);
  });

}
</script>

<style lang="sass" scoped>
@use "@/assets/styles/chatRiyani.sass";
</style>
