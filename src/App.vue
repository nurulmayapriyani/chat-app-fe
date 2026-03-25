<script setup lang="ts">
import ChatRoomRiyani from "./components/ChatRoomRiyani.vue";
import CHatRoomMay from "./components/ChatRoomMay.vue";

// Solution of Socket Listeners in Child Components

// import { onMounted } from "vue";
// import { socket } from "./socket";
// import { useItemStore } from "./stores/item";
// import { useConnectionStore } from "./stores/connection";

// const itemStore = useItemStore();
// const connectionStore = useConnectionStore();

// onMounted(() => {
//   socket.off(); // ✅ Clear old listeners (especially important for hot module reloads)
//   itemStore.bindEvents(); // ✅ Centralized socket listener logic
//   connectionStore.bindEvents(); // Optionally track connect/disconnect status
// });
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div> -->
  </header>

  <main class="chat-wrapper">
    <ChatRoomRiyani />
    <CHatRoomMay />
  </main>
</template>

<style scoped>
/*
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
*/

@media (min-width: 1024px) {
  /*
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
*/

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
