<script setup lang="ts">
import { GET_STRAIN_BY_ID } from "@/graphql/queries/strains";

const route = useRoute();

console.info("route", route.params.strainId);

const { result: strainData, loading } = useQuery(GET_STRAIN_BY_ID, {
  id: route.params.strainId,
}) as any;

console.info("strainData", strainData.value, loading.value);

const strain = computed(() => strainData?.value?.getStrainById);

console.info("strain", strain.value);
</script>

<template>
  <UContainer>
    <FormAddStrain v-if="strain" :initialState="strain" />
  </UContainer>
</template>
