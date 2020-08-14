<template>
  <div class="q-mx-auto" style=" width:100%; max-width:500px">
    <div class="q-mx-sm">
      <div class="text-h5">Select a user</div>
      <div class="q-mb-md">
        <q-input v-model="filter" outlined label="Search" dense>
          <template v-slot:append>
            <q-icon v-if="filter !==''" name="close" @click="filter = ''" class="cursor-pointer" />
            <q-icon v-else name="search" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-mx-sm">
      <q-table
        :data="data"
        :columns="columns"
        row-key="id"
        selection="single"
        :selected.sync="selected"
        :loading="loading"
        :filter="filter"
        :separator="'none'"
        hide-header
        hide-bottom
      >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </div>
    <div class="row justify-center q-mt-md">
      <q-btn
        padding="sm xl"
        color="primary"
        icon="fas fa-arrow-left"
        class="q-mx-sm"
        to="/user/home"
      />
      <q-btn
        padding="sm xl"
        color="green"
        class="q-mx-sm"
        icon="fas fa-check"
        :disable="disabled"
        @click="submit"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "newPrivateMessage",
  data() {
    return {
      data: [],
      columns: [
        {
          name: " Name",
          required: true,
          label: "name",
          field: "name",
          align: "left",
        },
      ],
      selected: [],
      loading: false,
      filter: "",
    };
  },
  async created() {
    this.loading = true;
    let res = await this.$axios.get("/api/user/users");
    this.data = res.data;
    this.loading = false;
  },
  computed: {
    disabled: function () {
      if (this.selected.length != 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    submit() {
      this.$axios.post(`/api/rooms/privateRoom/${this.selected[0].id}`);
      this.$router.push("/user/home");
    },
  },
};
</script>



<style>
</style>