<template>
  <div class="register-form">
    <h3>Registreren</h3>
    <form @submit.prevent="register" class="form">
      <input v-model="name" type="text" placeholder="Naam" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Wachtwoord" required />
      <button type="submit" class="buttonLogin">Registreren</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const res = await fetch("http://localhost/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            createdAt: new Date().toISOString(),
          }),
        });

        if (!res.ok) throw new Error("Registratie mislukt");
        const user = await res.json();
        // geef het geregistreerde user-object terug aan parent
        this.$emit("registered", user);
      } catch (err) {
        console.error(err);
        alert("Er is iets misgegaan tijdens registreren.");
      }
    },
  },
};
</script>

<style scoped>
.register-form {
  margin-top: 2rem;
}

.register-form h3 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  width: 100%;
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
</style>
