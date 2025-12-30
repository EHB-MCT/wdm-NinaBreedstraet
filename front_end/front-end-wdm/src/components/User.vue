<script>
export default {
  props: {
    name: String,
    email: String,
  },
};
</script>

<template>
  <div class="user">
    <p>
      <strong>{{ name }}</strong> - {{ email }}
    </p>
  </div>
</template>
