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
          <q-chat-message
            v-if="message.userName === fullName"
            :text="[message.msg]"
            sent
            :stamp="message.time"
          />
          <q-chat-message
            v-else
            :text="[message.msg]"
            bg-color="accent"
            :name="message.userName"
            :stamp="message.time"
          />
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
import { date } from "quasar";
import io from "socket.io-client";
export default {
  data() {
    return {
      message: "",
      socket: null,
      messages: [
        // { msg: "lalalala", send: true }
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
    this.messages = res.data.messages;
    this.socket = io();
    this.socket.emit("joinRoom", { room: this.room._id });
    this.socket.on("message", ({ msg, userName, time }) => {
      this.messages.push({ msg, userName, time });
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
        let timestamp = Date.now();
        let time = date.formatDate(timestamp, "ddd-H:mm");
        const chatMessage = {
          msg: this.message,
          room: this.room._id,
          userName: this.fullName,
          time: time,
        };
        this.socket.emit("message", chatMessage);
        this.messages.push(chatMessage);
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