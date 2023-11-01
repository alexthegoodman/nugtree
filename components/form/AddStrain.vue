<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { GET_CATEGORIES } from "@/graphql/queries/categories";

// get categories with apollo
const { data: categories } = useAsyncQuery(GET_CATEGORIES) as any;
const categoryData = computed(() => categories?.value?.getCategories);
const categoryList = computed(() =>
  categoryData.value?.map((c) => {
    return { id: c.id, label: c.name };
  })
);

const schema = object({
  name: string().required("Required"),
  notes: string(),
  categoryId: string().required("Required"),
  femaleParentId: string(),
  maleParentId: string(),
});

type Schema = InferType<typeof schema>;

const state = reactive({
  name: undefined,
  notes: undefined,
  categoryId: undefined,
  femaleParentId: undefined,
  maleParentId: undefined,
});

// Convert the reactive object to a plain object
const stateRefs = toRefs(state);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" />
    </UFormGroup>
    <UFormGroup label="Notes" name="notes">
      <UTextarea v-model="state.notes" />
    </UFormGroup>
    <UFormGroup label="Category" name="categoryId">
      <USelect
        v-model="state.categoryId"
        :options="categoryList"
        value-attribute="id"
      />
    </UFormGroup>
    <UFormGroup label="Female Parent" name="femaleParentId">
      <FormStrainSelect
        v-model="state.femaleParentId"
        :name="'femaleParentId'"
      />
    </UFormGroup>

    <UButton type="submit">Save Strain</UButton>
  </UForm>
</template>
