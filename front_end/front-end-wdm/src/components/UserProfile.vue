<template>
  <div v-if="user" class="view">
    <div class="profile">
      <h2>{{ user.name }}'s Profiel</h2>
      <p>Email: {{ user.email }}</p>
      <p>Aangemaakt op: {{ user.createdAt }}</p>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  props: {
    user: { type: Object, required: true },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: darkblue solid;
  align-items: baseline;
}
.profile,
.fietsen {
  background-color: lightblue;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 35rem;
  padding: 2rem;
  margin-bottom: 2rem;
}
.fietsenToevoegen {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 2rem;
  border-radius: 20px;
}
.parkingControl {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}
.buttonParking {
  align-items: center;
  background-color: grey;
  border: none;
  border-radius: 100px;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 600;
  padding: 0 20px;
  line-height: 20px;
  user-select: none;
}
.buttonParking:hover,
.buttonParking:focus {
  background-color: darkgrey;
}
.buttonParking:active {
  background: #09223b;
}
.buttonParking:disabled {
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.3);
}
.button {
  align-items: center;
  background-color: #0a66c2;
  border: none;
  border-radius: 100px;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px;
  line-height: 20px;
  user-select: none;
}
.button:hover,
.button:focus {
  background-color: #16437e;
}
.button:active {
  background: #09223b;
}
.button:disabled {
  cursor: not-allowed;
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.3);
}
</style>
