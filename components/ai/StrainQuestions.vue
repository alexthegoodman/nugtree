<script setup lang="ts">
import { useCompletion } from "ai/vue";

const { name } = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const {
  input: structuredInput,
  handleSubmit: structuredSubmit,
  completion: structuredCompletion,
  isLoading: structuredIsLoading,
  complete: structuredComplete,
} = useCompletion({
  api: "/api/structured",
  initialInput: `${name}`,
});

const structuredQuestions = computed(() =>
  structuredCompletion.value
    ? JSON.parse(JSON.parse(structuredCompletion.value).text)
    : null
);

onMounted(async () => {
  structuredComplete(name);
});

const {
  input: aboutStrainInput,
  handleSubmit: aboutStrainSubmit,
  completion: aboutStrainCompletion,
  isLoading: aboutStrainIsLoading,
  complete: aboutStrainComplete,
} = useCompletion({
  api: "/api/completion",
});
</script>

<template>
  <h5>Ask AI</h5>

  <UProgress v-if="structuredIsLoading" animation="carousel" />

  <UButton
    v-for="question in structuredQuestions"
    @click="aboutStrainComplete(question)"
    :loading="aboutStrainIsLoading"
  >
    {{ question }}
  </UButton>

  <p v-if="aboutStrainCompletion" class="block whitespace-pre-line mb-2">
    {{ aboutStrainCompletion }}
  </p>
</template>
