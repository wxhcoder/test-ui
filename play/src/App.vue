<template>
  <fl-icon :color="'red'" :size="24">
    <AccessTime20Filled></AccessTime20Filled>
  </fl-icon>
  <fl-button disabled> 按钮 </fl-button>
  <fl-input v-model="inputValue"></fl-input>
  {{ inputValue }}
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { AccessTime20Filled } from '@vicons/fluent'
const inputValue = ref('')
</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
