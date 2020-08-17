<template>
  <div class="column content-center items-center">
    <q-avatar color="primary" text-color="white" size="100px">{{fullName[0]}}</q-avatar>
    <div class="text-h5 q-ma-md">{{fullName}}</div>
    <q-expansion-item expand-separator class="text-body1" dense label="Personal Information">
      <q-card v-if="userInfo!==''">
        <q-card-section>Email:{{userInfo.email}}</q-card-section>
        <q-card-section>Birthdate:{{userInfo.birthdate.slice(0,10)}}</q-card-section>
        <q-card-section>Only {{userInfo.daysUntilBirthday}} days remaining untill yor next birthday 🎂</q-card-section>
      </q-card>
    </q-expansion-item>
    <q-btn-dropdown color="primary" dropdown-icon="fas fa-cog" class="q-mt-md" label="Settings">
      <q-list>
        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="far fa-envelope" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Change Email</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon name="fas fa-key" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Change Password</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable v-close-popup @click="delAccountDialog = true">
          <q-item-section avatar>
            <q-icon color="red" name="far fa-trash-alt" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-red">Delete Account</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>

    <q-dialog v-model="delAccountDialog" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Delete Account</div>
        </q-card-section>

        <q-card-section class="q-pt-none">Are you sure you want to delete your account</q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="Cancel" v-close-popup class="text-green" />
          <q-btn flat label="Delete" v-close-popup class="text-red" @click="deleteAccount" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date } from "quasar";
export default {
  data() {
    return {
      userInfo: "",
      delAccountDialog: false,
    };
  },
  async created() {
    const res = await this.$axios.get("/api/user/profile");
    this.userInfo = res.data;
  },
  computed: {
    fullName() {
      return this.$store.getters["chatStore/getFullName"];
    },
  },
  methods: {
    deleteAccount() {
      this.$axios.delete("/api/user").then((res) => {
        if (res.status == 200) {
          this.$router.push("/");
          this.$q.notify({
            message: "Account Deleted",
            color: "positive",
          });
        }
      });
    },
  },
};
</script>

<style>
</style>