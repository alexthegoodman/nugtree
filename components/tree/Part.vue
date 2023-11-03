<script setup lang="ts">
const { items } = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <!-- tree part to be rendered recursively -->
  <ul class="pl-4">
    <li v-for="item in items" :key="item.id">
      {{ item.label }}
      <Part :items="item.children" />
    </li>
  </ul>
</template>
