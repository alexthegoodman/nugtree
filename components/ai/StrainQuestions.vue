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
  handleSubmit: aboutStrainSubmit,
  completion: aboutStrainCompletion,
  isLoading: aboutStrainIsLoading,
} = useCompletion({
  api: "/api/completion",
  initialInput: `Tell me about ${name}`,
});

const {
  input: originsInput,
  handleSubmit: originsSubmit,
  completion: originsCompletion,
  isLoading: originsIsLoading,
} = useCompletion({
  api: "/api/completion",
  initialInput: `What are the origins of ${name}`,
});

const {
  input: effectsInput,
  handleSubmit: effectsSubmit,
  completion: effectsCompletion,
  isLoading: effectsIsLoading,
} = useCompletion({
  api: "/api/completion",
  initialInput: `What are the effects of ${name}`,
});

const {
  input: medicalUsesInput,
  handleSubmit: medicalUsesSubmit,
  completion: medicalUsesCompletion,
  isLoading: medicalUsesIsLoading,
} = useCompletion({
  api: "/api/completion",
  initialInput: `What are the medical uses of ${name}`,
});
</script>

<template>
  <h5>Ask AI</h5>

  <UButton
    @click="aboutStrainSubmit"
    color="primary"
    :loading="aboutStrainIsLoading"
    >Tell me about {{ name }}</UButton
  >
  <UButton @click="originsSubmit" color="primary" :loading="originsIsLoading"
    >What are the origins of {{ name }}</UButton
  >
  <UButton @click="effectsSubmit" color="primary" :loading="effectsIsLoading"
    >What are the effects of {{ name }}</UButton
  >
  <UButton
    @click="medicalUsesSubmit"
    color="primary"
    :loading="medicalUsesIsLoading"
    >What are the medical uses of {{ name }}</UButton
  >

  <p v-if="aboutStrainCompletion" class="block whitespace-pre-line mb-2">
    {{ aboutStrainCompletion }}
  </p>
  <p v-if="originsCompletion" class="block whitespace-pre-line mb-2">
    {{ originsCompletion }}
  </p>
  <p v-if="effectsCompletion" class="block whitespace-pre-line mb-2">
    {{ effectsCompletion }}
  </p>
  <p v-if="medicalUsesCompletion" class="block whitespace-pre-line mb-2">
    {{ medicalUsesCompletion }}
  </p>
</template>
