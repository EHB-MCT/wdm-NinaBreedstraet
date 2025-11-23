<template>
  <div v-if="loggedInUser">
    <h2>Welkom, {{ loggedInUser.name }}!</h2>

    <!-- 1) UserProfile geeft park en vuurt @refresh-user  -->
    <UserProfile :user="loggedInUser" @refresh-user="fetchUser" />
    <People v-if="person" :people="person" @refresh-user="fetchData" />
  </div>

  <div v-else>
    <p>⏳ Laden of niet ingelogd…</p>
  </div>
</template>

<script>
import UserProfile from "../components/UserProfile.vue";
import People from "../components/Data.vue";

export default {
  name: "DashboardView",
  components: { UserProfile, People },
  data() {
    return {
      loggedInUser: null,
      person: null,
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
        `http://localhost:3000/users/${this.loggedInUser._id}`
      );
      this.loggedInUser = await res.json();
      localStorage.setItem("loggedInUser", JSON.stringify(this.loggedInUser));
    },
    async fetchData() {
      console.log("lalalala");
      try {
        const res = await fetch("http://localhost:3000/people");

        if (!res.ok) {
          console.error("Fetch returned error", res.status, await res.text());
          return;
        }

        // Bekijk wat je krijgt
        const text = await res.text();
        console.log("Response text:", text);

        // Pas dan JSON parse
        this.person = JSON.parse(text);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    },

    // async fetchData() {
    //   const stored = localStorage.getItem("data");
    //   if (stored) {
    //     this.people = JSON.parse(stored);
    //   }

    //   const res = await fetch("http://localhost:80/people");
    //   this.people = await res.json();

    //   localStorage.setItem("people", JSON.stringify(this.people));
    // },
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchData();
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
