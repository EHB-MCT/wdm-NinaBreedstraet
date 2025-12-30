<template>
  <div class="dashboard-container">
    <div v-if="loggedInUser" class="dashboard-content">
      <h2>Welkom, {{ loggedInUser.name }}!</h2>

      <div class="dashboard-grid">
        <UserProfile
          :user="loggedInUser"
          @refresh-user="fetchUser"
          class="dashboard-card"
        />
        <h2>Data:</h2>

        <People
          v-if="person"
          :people="person"
          @refresh-user="fetchData"
          class="dashboard-card"
        />
      </div>
    </div>

    <div v-else class="loading">
      <p>⏳ Laden of niet ingelogd…</p>
    </div>
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
      try {
        const res = await fetch("http://localhost:3000/people");

        if (!res.ok) {
          console.error("Fetch returned error", res.status, await res.text());
          return;
        }

        const text = await res.text();

        this.person = JSON.parse(text);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    },
  },
  async mounted() {
    await this.fetchUser();
    await this.fetchData();
  },
};
</script>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-content h2 {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}

.dashboard-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.loading p {
  color: white;
  font-size: 1.2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .dashboard-content h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .dashboard-card {
    padding: 1.5rem;
  }
}
</style>
