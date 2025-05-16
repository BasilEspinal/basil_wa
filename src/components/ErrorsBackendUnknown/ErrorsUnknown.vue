<script setup>
import { errorMessages, hasCriticalError } from '@/stores/errorStore.js';
import { computed } from 'vue';
const showErrors = computed(() => hasCriticalError.value && Object.keys(errorMessages.value).length > 0);

const formatHeader = (key) => {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
</script>

<template>
  <Accordion v-if="showErrors" :activeIndex="0">
    <AccordionTab v-for="(msg, key, index) in errorMessages" :key="index" :header="formatHeader(key)">
      <p class="m-0 text-red-600 font-semibold">{{ msg }}</p>
    </AccordionTab>
  </Accordion>
</template>

<style scoped>
.text-red-600 {
  color: #dc2626;
}
.font-semibold {
  font-weight: 600;
}
</style>
