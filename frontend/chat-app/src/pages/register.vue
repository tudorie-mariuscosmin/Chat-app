<template>
  <div class="row justify-center q-mt-md">
    <div class="column items-center shadow-10">
      <h4 class="text-center">Create a new account</h4>
      <div class="row col q-mx-md" style="max-width: 400px; width:80vw  ">
        <q-input
          filled
          v-model="firstName"
          label="First Name"
          type="text"
          class="col"
          ref="firstName"
          :rules="[val=>!!val||'Please enter your First Name', val=>val.match(/^[A-Z]+[a-zA-Z]+$/)||'Names should contain only letters']"
        />
        <q-input
          filled
          v-model="lastName"
          label="Last Name"
          type="text"
          class="col"
          ref="lastName"
          :rules="[val=>!!val||'Please enter your Last Name', val=>val.match(/^[A-Z]+[a-zA-Z]+$/)||'Names should contain only letters']"
        />
      </div>
      <q-input
        filled
        v-model="email"
        label="Email"
        type="email"
        style="max-width: 400px; width:80vw"
        class="q-ma-md"
        ref="email"
        :rules="[val=>!!val||'Please enter your email' ,val=>val.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim)||'Please enter a valid email adress']"
      />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        style="max-width: 400px; width:80vw"
        class="q-mx-md"
        ref="password"
        :rules="[val=>!!val||'Please enter a password', val=>val.match(/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-z]){2,})(?=(?:.*\d){1,})(?=(?:.*[!@#$%^&*()\-_=+{};:,<.>]){1,})([A-Za-z0-9!@#$%^&*()\-_=+{};:,<.>]{8,20})$/)||'The password needs to have at least 8 digits and contain 1 upper case letter and one digit!']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div class="q-ma-md" style="max-width: 400px; width:80vw">
        <q-input
          filled
          v-model="date"
          label="Birthdate"
          ref="birthdate"
          :rules="[val=>!!val||'Please enter your birthdate']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                <q-date
                  v-model="date"
                  mask="YYYY-MM-DD"
                  @input="() => $refs.qDateProxy.hide()"
                  default-view="Years"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <q-btn
        color="primary"
        label="Register"
        style="max-width: 400px ; width:80vw"
        class="q-mx-md"
        @click="register"
      />
      <div class="q-ma-lg text-body2">
        Already registred?
        <span
          class="text-primary text-bold cursor-pointer"
          style="text-decoration:underline"
          @click="$router.push('/')"
        >Sign in</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      date: null,
      text: "",
      isPwd: true,
      firstName: "",
      lastName: "",
      password: "",
      email: "",
    };
  },
  methods: {
    register() {
      this.$refs.firstName.validate();
      this.$refs.lastName.validate();
      this.$refs.email.validate();
      this.$refs.password.validate();
      this.$refs.birthdate.validate();
      if (
        !this.$refs.firstName.hasError &&
        !this.$refs.lastName.hasError &&
        !this.$refs.email.hasError &&
        !this.$refs.password.hasError &&
        !this.$refs.birthdate.hasError
      ) {
        this.$axios
          .post("/api/auth/register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            birthdate: this.date,
          })
          .then((res) => {
            this.$q.notify({
              message: res.data,
              color: "primary",
              icon: "fas fa-check",
            });

            this.lastName = "";
            this.firstName = "";
            this.email = "";
            this.password = "";
            this.date = "";
            this.$refs.firstName.resetValidation();
            this.$refs.lastName.resetValidation();
            this.$refs.email.resetValidation();
            this.$refs.password.resetValidation();
            this.$refs.birthdate.resetValidation();
          })
          .catch((err) => {
            if (typeof err.response.data === "object") {
              err.response.data.forEach((errMsg) => {
                this.$q.notify({
                  message: errMsg,
                  color: "negative",
                  icon: "fas fa-exclamation",
                });
              });
            } else {
              this.$q.notify({
                message: err.response.data,
                color: "negative",
                icon: "fas fa-exclamation",
              });
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  background-image: url(../assets/img/Linth.png);
}
.text-center {
  margin: 4% 2% 5% 2%;
}
</style>