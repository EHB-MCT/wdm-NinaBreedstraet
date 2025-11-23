<template>
  <div v-if="people && people.length">
    <div v-for="p in people" :key="p._id" class="person">
      <h3>Person ID: {{ p._id }}</h3>
      <p>Time: {{ p.data.time }}</p>

      <div class="mediapipe">
        <h4>Mediapipe data:</h4>
        <ul>
          <li v-for="(value, key) in p.data.mediapipe" :key="key">
            {{ key }} : {{ value }}
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Geen data gevonden...</p>
  </div>
</template>

<script>
export default {
  name: "People",
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.view {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  align-items: baseline;
}
.person {
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
