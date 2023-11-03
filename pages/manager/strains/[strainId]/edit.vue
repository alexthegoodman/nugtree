<script setup lang="ts">
import { GET_STRAIN_BY_ID } from "@/graphql/queries/strains";

const route = useRoute();

console.info("route", route.params.strainId);

const { data: strainData } = useAsyncQuery(GET_STRAIN_BY_ID, {
  id: route.params.strainId,
}) as any;

console.info("strainData", strainData.value);

const strain = computed(() => strainData?.value?.getStrainById);

console.info("strain", strain.value);
</script>

<template>
  <UContainer>
    <FormAddStrain :initialState="strain" />
  </UContainer>
</template>
