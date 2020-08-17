<template>
  <div class="column content-center">
    <q-scroll-area
      :thumb-style="thumbStyle"
      style="height:75vh; width:90% ;max-width: 500px;"
      class="rounded-borders"
    >
      <q-toolbar
        class="bg-primary text-white shadow-2"
        style="border-top-left-radius: 5px; border-top-right-radius: 5px;"
      >
        <q-toolbar-title>Contacts</q-toolbar-title>
        <q-btn flat round dense icon="fas fa-plus">
          <q-menu transition-show="rotate" transition-hide="rotate">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup to="/user/npm">
                <q-item-section>Private Message</q-item-section>
              </q-item>
              <q-item clickable v-close-popup to="/user/ngc">
                <q-item-section>Group Chat</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
      <q-list bordered separator class>
        <q-inner-loading :showing="loading">
          <q-spinner color="primary" size="3em" />
        </q-inner-loading>
        <q-item
          clickable
          v-ripple
          v-for="room in rooms"
          :key="room.id"
          @click="$router.push({name:'chat', params:{roomId:room.id}})"
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">{{room.roomName[0]}}</q-avatar>
          </q-item-section>
          <q-item-section class="text-subtitle1">{{room.roomName}}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      rooms: null,
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#e51467",
        width: "5px",
        opacity: 0.75,
      },
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    const res = await this.$axios.get("/api/rooms/rooms");
    this.rooms = res.data;
    this.loading = false;
  },
};
</script>

<style scoped>
</style>