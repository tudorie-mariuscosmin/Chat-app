<template>
  <div>
    <div class="row justify-center items-center">
      <img src="../assets/img/logo.png" alt="logo" style="max-height:60px" />
      <h4>Chat App</h4>
    </div>
    <router-view></router-view>
    <div class="fixed-bottom q-mx-auto q-mb-sm" style=" max-width:500px">
      <q-btn-group spread>
        <q-btn color="primary" rounded glossy icon="fas fa-user" to="/user/profile" />
        <q-btn color="primary" rounded glossy icon="fas fa-comment-dots" to="/user/home" />
        <q-btn color="primary" rounded glossy icon="fas fa-sign-out-alt" @click="confirm = true" />
      </q-btn-group>
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="fas fa-sign-out-alt" color="primary" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to log out?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Log out" color="primary" v-close-popup @click="logOut" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
  data() {
    return {
      confirm: false,
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("chatStore/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>