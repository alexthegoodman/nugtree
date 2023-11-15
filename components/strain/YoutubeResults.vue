<script setup lang="ts">
const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const { data } = useFetch(`/api/youtube`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    search: `${name} cannabis strain`,
  }),
  key: name,
});
</script>

<template>
  <section class="grid grid-cols-5">
    <div v-if="data" v-for="item in data.items">
      <img :src="item.snippet.thumbnails.default.url" />
      <a
        :href="`https://www.youtube.com/watch?v=${item.id.videoId}`"
        target="_blank"
      >
        {{ item.snippet.title }}
      </a>
    </div>
  </section>
</template>
