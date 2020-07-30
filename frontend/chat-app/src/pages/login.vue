<template>
  <div class="fit column content-center q-mt-xl">
    <div class="row justify-center no-wrap container shadow-10">
      <img src="../assets/img/Linth-crop.png" class="pattern desktop-only q-ma-sm" />
      <div>
        <h4 class="text-center">Chat App</h4>
        <q-input
          filled
          v-model="email"
          label="Email"
          type="email"
          class="q-ma-lg input"
          :rules="[val=>!!val|| 'Please enter your email!', val=>val.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)||'Please enter a valid email!']"
          ref="email"
        />
        <q-input
          filled
          v-model="password"
          label="Password"
          type="password"
          class="q-ma-lg input"
          :rules="[val=>!!val|| 'Please enter your password!']"
          ref="password"
        />
        <q-btn color="primary" label="Sign in" class="input q-mx-lg q-mb-lg" @click="signIn" />
        <div class="q-ma-lg text-body2">
          Don't have an account yet?
          <span
            class="text-primary text-bold cursor-pointer"
            style="text-decoration:underline"
            @click="$router.push('/register')"
          >Create one here</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.$axios
          .post("/api/login", {
            email: this.email,
            password: this.password,
          })
          .then((res) => {
            this.$store.dispatch("chatStore/login", res.data);
          })
          .catch((err) =>
            this.$q.notify({
              message: err.response.data,
              color: "negative",
            })
          );
      }
    },
  },
};
</script>

<style scoped>
.pattern {
  width: 80vw;
  max-width: 600px;
}
.input {
  width: 80vw;
  max-width: 300px;
}
</style>

