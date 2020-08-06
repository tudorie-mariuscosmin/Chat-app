<template>
  <div>
    <div class="row justify-center items-center">
      <img src="../assets/img/logo.png" alt="logo" style="max-height:60px" />
      <h4>Chat App</h4>
    </div>
    <router-view></router-view>
    <div class="fixed-bottom q-mx-auto q-mb-sm" style=" max-width:500px">
      <q-btn-group spread rounded>
        <q-btn color="primary" rounded glossy icon="fas fa-user" />
        <q-btn color="primary" rounded glossy icon="fas fa-comment-dots" />
        <q-btn color="primary" rounded glossy icon="fas fa-sign-out-alt" />
      </q-btn-group>
    </div>
  </div>
</template>

<script>
name: "UserLayout";
export default {};
</script>

<style>
</style>