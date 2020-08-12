<template>
  <div class="column content-center">
    <q-scroll-area :thumb-style="thumbStyle" style="height:75vh; width:100% ;max-width: 500px;">
      <q-list bordered separator class="rounded-borders">
        <q-item
          clickable
          v-ripple
          v-for="room in rooms"
          :key="room._id"
          @click="$router.push({name:'chat', params:{roomId:room._id}})"
        >
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">{{room.roomName[0]}}</q-avatar>
          </q-item-section>
          <q-item-section>{{room.roomName}}</q-item-section>
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
    };
  },
  async created() {
    const res = await this.$axios.get("/api/rooms/rooms");
    this.rooms = res.data;
  },
};
</script>

<style>
</style>