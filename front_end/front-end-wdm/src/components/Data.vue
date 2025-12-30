<template>
  <div>
    <div v-for="uid in uids" :key="uid" class="chart-container">
      <h3>UID: {{ uid }}</h3>

      <button class="toggle-btn" @click="toggle(uid)">
        <p>Filter</p>
        {{ open[uid] ? "↑" : " ↓" }}
      </button>

      <div v-if="open[uid]" class="dropdown">
        <div class="select-header">
          <p>Selecteer meerdere kanalen (houd Ctrl/Cmd ingedrukt):</p>
          <div class="selected-count">
            {{ selectedChannels[uid].length }} geselecteerd
          </div>
        </div>
        <select
          multiple
          v-model="selectedChannels[uid]"
          size="8"
          @change="logSelection(uid)"
          style="width: 100%"
        >
          <option v-for="ch in availableChannels[uid]" :key="ch" :value="ch">
            {{ ch }}
          </option>
        </select>
        <div class="select-actions">
          <button @click="selectAll(uid)" class="select-btn">
            Selecteer alles
          </button>
          <button @click="clearSelection(uid)" class="select-btn">
            Wis selectie
          </button>
        </div>
      </div>

      <div class="chart-wrapper">
        <canvas :ref="(el) => (chartRefs[uid] = el)"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from "vue";
import { Chart } from "chart.js/auto";

const uids = ref([]);
const chartRefs = {};
const charts = {};
const allData = ref({});

const selectedChannels = ref({});
const availableChannels = ref({});
const open = ref({});
function toggle(uid) {
  open.value[uid] = !open.value[uid];
}

function selectAll(uid) {
  selectedChannels.value[uid] = [...availableChannels.value[uid]];
}

function clearSelection(uid) {
  selectedChannels.value[uid] = [];
}

function logSelection(uid) {
  console.log("Selected channels for", uid, ":", selectedChannels.value[uid]);
}

async function fetchUIDs() {
  const res = await fetch("http://localhost:3000/uids");
  return await res.json();
}

async function fetchDataForUID(uid) {
  const res = await fetch(`http://localhost:3000/people/${uid}`);
  let data = await res.json();
  if (!Array.isArray(data)) data = [data];
  return data;
}

function createChart(uid, data) {
  if (charts[uid]) charts[uid].destroy();

  const ctx = chartRefs[uid].getContext("2d");
  const labels = data.map((d) => d.data.time);

  const datasets = selectedChannels.value[uid].map((ch, idx) => ({
    label: ch,
    data: data.map((d) => d.data.mediapipe?.[ch] ?? null),
    borderColor: `hsl(${idx * 50}, 70%, 50%)`,
    fill: false,
  }));

  charts[uid] = new Chart(ctx, {
    type: "line",
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

onMounted(async () => {
  uids.value = (await fetchUIDs()).filter((u) => u != null);
  await nextTick();

  for (const uid of uids.value) {
    open.value[uid] = false;

    const data = await fetchDataForUID(uid);
    allData.value[uid] = data;

    const keys = Object.keys(data[0]?.data?.mediapipe || {});
    availableChannels.value[uid] = keys;

    selectedChannels.value[uid] = keys.filter((ch) => ch.includes("wrist"));

    await nextTick();
    createChart(uid, data);

    watch(
      () => [...selectedChannels.value[uid]],
      () => {
        console.log(
          "Selection changed for",
          uid,
          ":",
          selectedChannels.value[uid]
        );
        createChart(uid, allData.value[uid]);
      },
      { deep: true }
    );
  }
});
</script>

<style>
.chart-container {
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.chart-container:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.chart-container h3 {
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.chart-wrapper {
  width: 100%;
  max-width: 800px;
  height: 400px;
  position: relative;
  margin-top: 1rem;
}

.chart-container canvas {
  height: 100% !important;
  width: 100% !important;
  border-radius: 8px;
}

.toggle-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  margin-bottom: 1rem;
}

.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.toggle-btn:active {
  transform: translateY(0);
}

.toggle-btn p {
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 1rem;
  margin: 0;
}

.dropdown {
  width: 100%;
  max-width: 500px;
  margin-bottom: 1.5rem;
}

.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
}

.select-header p {
  margin: 0;
  font-size: 0.85rem;
  color: #4a5568;
  font-weight: 500;
}

.selected-count {
  background: #667eea;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.dropdown select {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.9rem;
  background: white;
  color: #2d3748;
  transition: border-color 0.3s ease;
  min-height: 200px;
}

.dropdown select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.dropdown select option {
  padding: 0.5rem;
  color: #2d3748;
}

.dropdown select option:checked {
  background: #667eea;
  color: white;
}

.select-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.select-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-btn:hover {
  background: #667eea;
  color: white;
  transform: translateY(-1px);
}
</style>
