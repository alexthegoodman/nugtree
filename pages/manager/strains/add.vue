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

console.info(
  "category data",
  categories.value,
  categoryData.value,
  categoryList.value
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

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}
</script>

<template>
  <UContainer>
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

      <UButton type="submit">Save Strain</UButton>
    </UForm>
  </UContainer>
</template>
