<template>
  <div class="column content-center full-height">
    <q-inner-loading :showing="loading">
      <q-spinner color="primary" size="3em" />
    </q-inner-loading>
    <div class="row top-bar">
      <q-btn flat icon="fas fa-arrow-left" @click="$router.push('/user/home')" />
      <div class="q-mx-auto text-center q-my-auto text-h5">{{title}}</div>
      <q-btn flat round icon="fas fa-info" @click="infoDialog = true" />
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

    <q-dialog v-model="infoDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Info</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <q-btn-dropdown color="secondary" label="Settings" dropdown-icon="fas fa-cog">
            <q-list>
              <q-item clickable v-close-popup @click="delMsgDialog = true">
                <q-item-section avatar>
                  <q-icon color="red" name="far fa-trash-alt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-red">Delete Messages</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="delConvDialog = true">
                <q-item-section avatar>
                  <q-icon color="red" name="far fa-trash-alt" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-red">Delete Conversation</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="delMsgDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Messages</div>
        </q-card-section>

        <q-card-section
          class="q-pt-none"
        >Are you sure you want to delete this conversation messages?</q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup class="text-green" />
          <q-btn flat label="Delete" v-close-popup class="text-red" @click="delMsg()" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="delConvDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Conversation</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Are you sure you want to delete this conversation</q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-green" />
          <q-btn flat label="Delete" v-close-popup class="text-red" @click="delConv" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      infoDialog: false,
      delMsgDialog: false,
      delConvDialog: false,
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    const res = await this.$axios.get(
      `/api/rooms/room/${this.$route.params.roomId}`
    );
    this.room = res.data;
    this.messages = res.data.messages;
    this.loading = false;
    this.socket = io();
    this.socket.emit("joinRoom", { room: this.room.id });
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
          room: this.room.id,
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
    delMsg() {
      this.$axios
        .delete(`/api/rooms/messages/${this.$route.params.roomId}`)
        .then((res) => {
          if (res.status == 200) {
            this.$q.notify({
              message: "Messages deleted",
              color: "positive",
            });
            this.messages = [];
          }
        })
        .catch((err) => {
          if (err) {
            this.$q.notify({
              message: "Something went wrong",
              color: "negative",
            });
          }
        });
    },

    delConv() {
      this.$axios
        .delete(`/api/rooms/${this.$route.params.roomId}`)
        .then((res) => {
          if (res.status == 200) {
            if (res.status == 200) {
              this.$q.notify({
                message: "Conversation Deleted",
                color: "positive",
              });
              this.$router.push("/user/home");
            }
          }
        })
        .catch((err) => {
          this.$q.notify({
            message: "Something went wrong",
            color: "negative",
          });
        });
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