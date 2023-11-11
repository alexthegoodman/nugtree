<script setup lang="ts">
const { items } = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const treeStore = useTreeStore();
</script>

<template>
  <!-- tree part to be rendered recursively, color-coated -->
  <ul
    class="pl-4"
    :style="{ color: `#${Math.floor(Math.random() * 16777215).toString(16)}` }"
  >
    <li v-for="item in items" :key="item.id">
      <span
        @click="treeStore.setSelectedStrain(item.id)"
        class="cursor-pointer hover:underline"
        >{{ item.label }} <strong>({{ item.name }})</strong></span
      >
      <UBadge v-if="item.category">{{ item.category.name }}</UBadge>
      <Part :items="item.children" />
    </li>
  </ul>
</template>
