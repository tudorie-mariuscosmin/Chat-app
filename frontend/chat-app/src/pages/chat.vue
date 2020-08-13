<template>
  <div class="column content-center full-height">
    <div class="row top-bar">
      <q-btn flat icon="fas fa-arrow-left" @click="$router.push('/user/home')" />
      <div class="q-mx-auto text-center q-my-auto text-h5">{{title}}</div>
      <q-btn flat round icon="fas fa-info" />
    </div>
    <q-scroll-area
      :thumb-style="thumbStyle"
      style="height:85vh; width:100% ;max-width: 500px;"
      ref="scrollArea"
    >
      <div class="q-pa-md row justify-center">
        <div v-for="message in messages" :key="message.index" style="width: 100%">
          <q-chat-message v-if="message.send" :text="[message.text]" sent />
          <q-chat-message v-if="!message.send" :text="[message.text]" bg-color="accent" />
        </div>
      </div>
    </q-scroll-area>
    <q-input
      class="fixed-bottom q-mx-auto q-ma-xs"
      style="max-width:500px"
      filled
      v-model="message"
      placeholder="Type a message..."
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
      room: null,

      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#e51467",
        width: "5px",
        opacity: 0.75,
      },
    };
  },
  async created() {
    const res = await this.$axios.get(
      `/api/rooms/room/${this.$route.params.roomId}`
    );
    this.room = res.data;
    this.socket = io();
    this.socket.emit("joinRoom", { room: this.room._id });
    this.socket.on("message", (message) => {
      this.messages.push({ text: message, send: false });
      this.message = "";
    });
    this.socket.on("info", (info) =>
      this.$q.notify({
        message: info,
        color: "primary",
      })
    );
  },
  methods: {
    send() {
      if (this.message) {
        this.socket.emit("message", { msg: this.message, room: this.room._id });
        this.messages.push({ text: this.message, send: true });
        this.message = "";
        this.$refs.scrollArea.setScrollPosition(
          this.messages.length * 100,
          300
        );
      }
    },
  },
  computed: {
    fullName() {
      return this.$store.getters["chatStore/getFullName"];
    },
    title() {
      if (this.room) return this.room.roomName;
      else return "";
    },
  },
};
</script>

<style scoped>
</style>