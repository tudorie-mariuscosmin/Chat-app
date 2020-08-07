<template>
  <div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      :content-style="contentStyle"
      :content-active-style="contentActiveStyle"
      style="height: 400px; max-width: 300px;"
      ref="scrollArea"
    >
      <div class="q-pa-md row justify-center">
        <div v-for="mesag in messages" :key="mesag.index" style="width: 100%; max-width: 300px">
          <q-chat-message v-if="mesag.send" :text="[mesag.msg]" sent />
          <q-chat-message v-if="!mesag.send" :text="[mesag.msg]" />
        </div>
      </div>
    </q-scroll-area>
    <q-input
      filled
      v-model="message"
      placeholder="enter messege"
      style=" max-width:300px"
      v-on:keyup.enter="send"
    >
      <template v-slot:after>
        <q-btn flat icon="fas fa-paper-plane" color="primary" @click="send" />
      </template>
    </q-input>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  data() {
    return {
      message: "",
      socket: null,
      messages: [
        // { msg: "lalalala", send: true },
        // { msg: "hello", send: false },
        // { msg: "cf?", send: false },
        // { msg: "bine, tu?", send: true },
        // { msg: "bine", send: false },
      ],
      contentStyle: {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555",
      },

      contentActiveStyle: {
        backgroundColor: "#eee",
        color: "black",
      },

      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
    };
  },
  created() {
    this.socket = io();
    this.socket.on("message", (message) => {
      this.messages.push({ msg: message, send: false });
      this.message = "";
    });
  },
  methods: {
    send() {
      if (this.message) {
        this.socket.emit("chatMsg", this.message);
        this.messages.push({ msg: this.message, send: true });
        this.message = "";
        this.$refs.scrollArea.setScrollPosition(
          this.messages.length * 100,
          300
        );
      }
    },
  },
};
</script>

<style>
</style>