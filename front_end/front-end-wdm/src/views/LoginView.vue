<template>
  <div class="overview auth-page">
    <h2>Inloggen</h2>
    <form @submit.prevent="loginUser" class="form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Wachtwoord"
        required
      />
      <div class="button-row">
        <button type="submit" class="buttonLogin">Inloggen</button>
        <button
          class="buttonLogin secondary"
          @click="showRegister = !showRegister"
        >
          {{ showRegister ? "Terug naar inloggen" : "Registreren" }}
        </button>
      </div>
    </form>

    <hr v-if="!showRegister" />

    <RegisterForm v-if="showRegister" @registered="onRegistered" class="form" />
  </div>
</template>

<script>
import RegisterForm from "../components/RegisterForm.vue";

export default {
  name: "LoginView",
  components: { RegisterForm },
  data() {
    return {
      email: "",
      password: "",
      showRegister: false,
    };
  },
  methods: {
    async loginUser() {
      try {
        const res = await fetch("http://localhost:3000/users");
        const users = await res.json();
        const user = users.find(
          (u) => u.email === this.email && u.password === this.password
        );
        if (user) {
          localStorage.setItem("loggedInUser", JSON.stringify(user));
          this.$router.push("/dashboard");
        } else {
          alert("Ongeldige inloggegevens!");
        }
      } catch (err) {
        console.error(err);
        alert("Fout bij inloggen.");
      }
    },
    onRegistered(user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.overview {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 3rem;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.overview h2 {
  color: #2d3748;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.button-row {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.form input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  color: #2d3748;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.form input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.form input::placeholder {
  color: #a0aec0;
}

.buttonLogin {
  flex: 1;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.buttonLogin:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.buttonLogin:active {
  transform: translateY(0);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

hr {
  border: none;
  height: 1px;
  background: linear-gradient(to right, transparent, #e2e8f0, transparent);
  margin: 2rem 0;
}

.buttonLogin.secondary {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
  box-shadow: none;
  width: auto;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
}

.buttonLogin.secondary:hover {
  background: #667eea;
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}
</style>
