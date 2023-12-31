import type { info } from 'console';
<script setup lang="ts">
import { object, string, type InferType } from "yup";
import type { FormSubmitEvent } from "#ui/types";
import { GET_CATEGORIES } from "@/graphql/queries/categories";
import { CREATE_STRAIN, UPDATE_STRAIN_BY_ID } from "~/graphql/queries/strains";

const props = defineProps({
  initialState: {
    type: Object,
    default: () => ({}),
  },
});

console.info("props addstrain", props.initialState);

const router = useRouter();
const route = useRoute();
const { mutate } = useMutation(CREATE_STRAIN);
const { mutate: mutateById } = useMutation(UPDATE_STRAIN_BY_ID);
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
  name: props.initialState.name || undefined,
  notes: props.initialState.notes || undefined,
  categoryId: props.initialState.category?.id || undefined,
  femaleParentId: props.initialState.femaleParent?.id || undefined,
  maleParentId: props.initialState.maleParent?.id || undefined,
  additionalParentIds:
    props.initialState.additionalParents?.map((p) => p.id) || [],
});

// Convert the reactive object to a plain object
const stateRefs = toRefs(state);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const formData = event.data;
  console.log("onSubmit", formData);

  if (props.initialState.name) {
    // update

    const { data } = await mutateById({
      id: route.params.strainId,
      ...formData,
    });
    const updatedStrain = data?.updateStrainById;
    console.info("updated strain data", updatedStrain);
    // go to strains
    router.push({ path: "/manager/strains" });
  } else {
    // create

    const { data } = await mutate(formData);
    const newStrain = data?.createStrain;
    console.info("new strain data", newStrain);
    // go to strains
    router.push({ path: "/manager/strains" });
  }
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
      {{ state.categoryId }}
      <USelect
        v-model="state.categoryId"
        :options="categoryList"
        value-attribute="id"
      />
    </UFormGroup>
    <!-- thirds grid -->
    <section class="grid grid-cols-3">
      <UFormGroup label="Female Parent" name="femaleParentId">
        {{ state.femaleParentId }}
        <FormStrainSelect
          v-model="state.femaleParentId"
          :name="'femaleParentId'"
        />
      </UFormGroup>
      <UFormGroup label="Male Parent" name="maleParentId">
        {{ state.maleParentId }}
        <FormStrainSelect v-model="state.maleParentId" :name="'maleParentId'" />
      </UFormGroup>
      <UFormGroup label="Additional Parents" name="additionalParentIds">
        {{ state.additionalParentIds }}
        <FormStrainSelect
          v-model="state.additionalParentIds"
          :name="'additionalParentIds'"
          multiple
        />
      </UFormGroup>
    </section>

    <UButton type="submit">Save Strain</UButton>
  </UForm>
</template>
