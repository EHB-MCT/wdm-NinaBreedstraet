<!-- File: src/components/RegisterForm.vue -->
<template>
  <div class="register-form">
    <h3>Registreren</h3>
    <form @submit.prevent="register">
      <div>
        <label>Naam</label>
        <input v-model="name" type="text" required />
      </div>
      <div>
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div>
        <label>Wachtwoord</label>
        <input v-model="password" type="password" required />
      </div>

      <button type="submit">Registreren</button>
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
