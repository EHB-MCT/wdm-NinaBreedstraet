<template>
  <VueUiTableSparkline :data="sparkData" />
</template>

<script setup>
import VueUiTableSparkline from "vue-data-ui/table_sparkline";

import data from "./my_raw_data.json";
import { convertFramesToSparklineData } from "./converter.js";

const sparkData = convertFramesToSparklineData(data);
</script>
