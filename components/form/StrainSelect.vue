import type { info } from 'console';
<script lang="ts">
export default defineComponent({
  name: "StrainSelect",
  props: {
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    options,
    selected,
  }),
  setup(props, { emit }) {
    console.info("props", props);

    const value = props.value;

    // This is the prop passed down from the parent component
    const modelValue = ref(value); // Replace '' with the actual initial value

    // This is the local data property
    const localValue = ref(modelValue.value);

    // Watch for changes in the prop and update the local data property
    watch(modelValue, (newValue) => {
      localValue.value = newValue;
    });

    // Watch for changes in the local data property and emit an event to update the prop
    watch(localValue, (newValue) => {
      emit("update:modelValue", newValue.id);
    });

    const updateValue = (newValue: string) => {
      emit("update:modelValue", newValue);
    };

    return {
      updateValue,
      localValue,
    };
  },
});

const options = ref([
  { id: 1, name: "bug" },
  { id: 2, name: "documentation" },
  { id: 3, name: "duplicate" },
  { id: 4, name: "enhancement" },
  { id: 5, name: "good first issue" },
  { id: 6, name: "help wanted" },
  { id: 7, name: "invalid" },
  { id: 8, name: "question" },
  { id: 9, name: "wontfix" },
]);

const selected = ref([]);
</script>

<template>
  <USelectMenu
    v-model="localValue"
    by="id"
    :name="name"
    :options="options"
    option-attribute="name"
    searchable
    creatable
  >
    <template #label>
      <template v-if="localValue">
        <span>{{ localValue.name }}</span>
      </template>
      <template v-else>
        <span class="text-gray-500 dark:text-gray-400 truncate"
          >Select labels</span
        >
      </template>
    </template>
    <template #option="{ option }">
      <span class="truncate">{{ option.name }}</span>
    </template>
    <template #option-create="{ option }">
      <span class="flex-shrink-0">New label:</span>

      <span class="block truncate">{{ option.name }}</span>
    </template>
  </USelectMenu>
</template>
