<template>
  <div class="overview auth-page">
    <h2>🚲 Inloggen</h2>
    <form @submit.prevent="loginUser" class="form">
      <input type="email" v-model="email" placeholder="Email" required />
      <input
        type="password"
        v-model="password"
        placeholder="Wachtwoord"
        required
      />
      <button type="submit" class="buttonParking">Inloggen</button>
    </form>

    <hr />

    <button class="buttonParking" @click="showRegister = !showRegister">
      {{
        showRegister ? "Terug naar inloggen" : "Nog geen account? Registreren"
      }}
    </button>

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
.overview {
  background-color: lightblue;
  border-radius: 20px;
  padding: 2rem;
  max-width: 400px;
  margin: 2rem auto;
}
.form {
  margin-bottom: 2rem;
  border-bottom: darkblue solid;
  display: flex;
  flex-direction: column;
}
.form input {
  margin-bottom: 0.75rem;
  padding: 0.5rem;
}
.buttonParking {
  align-items: center;
  align-self: flex-start;
  background-color: grey;
  border: 0;
  border-radius: 100px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
  justify-content: center;
  line-height: 20px;
  max-width: 380px;
  min-height: 20px;
  min-width: 0px;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  touch-action: manipulation;
  transition: background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.167s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}
.buttonParking:hover,
.buttonParking:focus {
  background-color: darkgrey;
  color: #ffffff;
}
.buttonParking:active {
  background: #09223b;
  color: rgba(255, 255, 255, 0.7);
}
.buttonParking:disabled {
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.3);
}
</style>
