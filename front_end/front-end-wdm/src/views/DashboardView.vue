<template>
  <div v-if="loggedInUser">
    <h2>Welkom, {{ loggedInUser.name }}!</h2>

    <!-- 1) UserProfile geeft park en vuurt @refresh-user  -->
    <UserProfile :user="loggedInUser" @refresh-user="fetchUser" />
  </div>

  <div v-else>
    <p>⏳ Laden of niet ingelogd…</p>
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";

export default {
  name: "DashboardView",
  components: { UserProfile },
  data() {
    return {
      loggedInUser: null,
    };
  },
  methods: {
    async fetchUser() {
      const stored = localStorage.getItem("loggedInUser");
      if (!stored) {
        this.$router.push("/");
        return;
      }
      this.loggedInUser = JSON.parse(stored);
      const res = await fetch(
        `http://localhost:5174/users/${this.loggedInUser.id}`
      );
      this.loggedInUser = await res.json();
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    },
    async refreshAll() {
      await this.fetchUser();
    },
  },
  async mounted() {
    await this.refreshAll();
  },
};
</script>

<style>
* {
  padding: 5px;
}
h2 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
