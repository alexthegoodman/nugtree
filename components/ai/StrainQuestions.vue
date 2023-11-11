<script setup lang="ts">
import { useCompletion } from "ai/vue";

const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});

console.info("name", name, name.value);

const {
  input: aboutStrainInput,
  handleSubmit,
  completion,
} = useCompletion({
  api: "/api/completion",
  initialInput: `Tell me about ${name}`,
});
</script>

<template>
  <h5>Ask AI</h5>

  <UButton @click="handleSubmit" color="primary"
    >Tell me about {{ name }}</UButton
  >
  <UButton @click="handleSubmit" color="primary"
    >What are the origins of {{ name }}</UButton
  >
  <UButton @click="handleSubmit" color="primary"
    >What are the effects of {{ name }}</UButton
  >
  <UButton @click="handleSubmit" color="primary"
    >What are the flavors of {{ name }}</UButton
  >
  <UButton @click="handleSubmit" color="primary"
    >What are the medical uses of {{ name }}</UButton
  >

  <p>{{ completion }}</p>
</template>
