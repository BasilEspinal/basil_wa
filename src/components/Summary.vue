<template>
  <div class="col-12 lg:col-6 xl:col-3">
    <div class="card mb-0">
      <div class="flex justify-content-between mb-3">
        <div>
          <span class="block text-500 font-medium mb-3">{{ title }}</span>
          <div v-for="(value, label) in fields" :key="label" class="text-900 font-medium text-xl">
            {{ label }}: {{ value }}
          </div>
        </div>
        <div class="flex align-items-center justify-content-center border-round" :style="{ backgroundColor: bgColor, width: '2.5rem', height: '2.5rem' }">
          <i :class="icon" :style="{ color: iconColor, fontSize: '1.25rem' }"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  title: String,
  fields: Object,
  icon: String,
  bgColor: String,
  iconColor: String,
});
</script>

<style scoped>
/* Add custom styles if needed */
</style>
