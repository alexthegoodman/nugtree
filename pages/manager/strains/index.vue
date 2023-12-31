<script lang="ts" setup>
import { GET_STRAINS } from "@/graphql/queries/strains";

const router = useRouter();

// Columns
const columns = [
  // {
  //   key: "id",
  //   label: "ID",
  //   sortable: false,
  // },
  {
    key: "name",
    label: "Name",
    sortable: false,
  },
  {
    key: "category.name",
    label: "Category",
    sortable: false,
  },
  {
    key: "femaleParent.name",
    label: "Female Parent",
    sortable: false,
  },
  {
    key: "maleParent.name",
    label: "Male Parent",
    sortable: false,
  },
  // {
  //   key: "completed",
  //   label: "Status",
  //   sortable: true,
  // },
  {
    key: "notes",
    label: "Notes",
    sortable: false,
  },
  {
    key: "actions",
    label: "Actions",
    sortable: false,
  },
];

const selectedColumns = ref(columns);
const columnsTable = computed(() =>
  columns.filter((column) => selectedColumns.value.includes(column))
);

// Selected Rows
const selectedRows = ref([]);

function select(row) {
  const index = selectedRows.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selectedRows.value.push(row);
  } else {
    selectedRows.value.splice(index, 1);
  }
}

// Actions
const items = (row) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => {
        router.push({ path: `/manager/strains/${row.id}/edit` });
      },
    },
    // {
    //   label: "Duplicate",
    //   icon: "i-heroicons-document-duplicate-20-solid",
    // },
  ],
  // [
  //   {
  //     label: "Archive",
  //     icon: "i-heroicons-archive-box-20-solid",
  //   },
  //   {
  //     label: "Move",
  //     icon: "i-heroicons-arrow-right-circle-20-solid",
  //   },
  // ],
  // [
  //   {
  //     label: "Delete",
  //     icon: "i-heroicons-trash-20-solid",
  //   },
  // ],
];

// Filters
const todoStatus = [
  {
    key: "uncompleted",
    label: "In Progress",
    value: false,
  },
  {
    key: "completed",
    label: "Completed",
    value: true,
  },
];

const search = ref("");
const selectedStatus = ref([]);
const searchStatus = computed(() => {
  if (selectedStatus.value?.length === 0) {
    return "";
  }

  if (selectedStatus?.value?.length > 1) {
    return `?completed=${selectedStatus.value[0].value}&completed=${selectedStatus.value[1].value}`;
  }

  return `?completed=${selectedStatus.value[0].value}`;
});

const resetFilters = () => {
  search.value = "";
  selectedStatus.value = [];
};

// Pagination
const page = ref(1);
const pageCount = ref(10);
const pageTotal = ref(200); // This value should be dynamic coming from the API
const pageFrom = computed(() => (page.value - 1) * pageCount.value + 1);
const pageTo = computed(() =>
  Math.min(page.value * pageCount.value, pageTotal.value)
);

// Data
// fetch data with nuxt apollo
// update variables as dependent variables change
const variables = computed(() => ({
  page: page.value,
  limit: pageCount.value,
  query: search.value,
}));

const { result, loading } = (await useQuery(GET_STRAINS, variables)) as any;
const tableData = computed(() => {
  return result.value?.getStrains || [];
});

console.info("strain data", tableData.value);
</script>

<template>
  <UContainer>
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: {
          padding: '',
          base: 'divide-y divide-gray-200 dark:divide-gray-700',
        },
        footer: { padding: 'p-4' },
      }"
    >
      <template #header>
        <div class="flex flex-row justify-between">
          <h2
            class="font-semibold text-xl text-gray-900 dark:text-white leading-tight"
          >
            Strains
          </h2>
          <UButton to="/manager/strains/add">Add Strain</UButton>
        </div>
      </template>

      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..."
        />

        <USelectMenu
          v-model="selectedStatus"
          :options="todoStatus"
          multiple
          placeholder="Status"
          class="w-40"
        />
      </div>

      <!-- Header and Action buttons -->
      <div class="flex justify-between items-center w-full px-4 py-3">
        <div class="flex items-center gap-1.5">
          <span class="text-sm leading-5">Rows per page:</span>

          <USelect
            v-model="pageCount"
            :options="[3, 5, 10, 20, 30, 40]"
            class="me-2 w-20"
            size="xs"
          />
        </div>

        <div class="flex gap-1.5 items-center">
          <UDropdown
            v-if="selectedRows.length > 1"
            :items="items"
            :ui="{ width: 'w-36' }"
          >
            <UButton
              icon="i-heroicons-chevron-down"
              trailing
              color="gray"
              size="xs"
            >
              Mark as
            </UButton>
          </UDropdown>

          <USelectMenu v-model="selectedColumns" :options="columns" multiple>
            <UButton icon="i-heroicons-view-columns" color="gray" size="xs">
              Columns
            </UButton>
          </USelectMenu>

          <UButton
            icon="i-heroicons-funnel"
            color="gray"
            size="xs"
            :disabled="search === '' && selectedStatus.length === 0"
            @click="resetFilters"
          >
            Reset
          </UButton>
        </div>
      </div>

      <!-- Table -->
      <UTable
        v-model="selectedRows"
        :rows="tableData"
        :columns="columnsTable"
        :loading="loading"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        class="w-full"
        :ui="{ td: { base: 'max-w-[0] truncate' } }"
        @select="select"
      >
        <template #completed-data="{ row }">
          <UBadge
            size="xs"
            :label="row.completed ? 'Completed' : 'In Progress'"
            :color="row.completed ? 'emerald' : 'orange'"
            variant="subtle"
          />
        </template>

        <template #actions-data="{ row }">
          <UDropdown :items="items(row)">
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
          </UDropdown>
        </template>
      </UTable>

      <!-- Number of rows & Pagination -->
      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <div>
            <span class="text-sm leading-5">
              Showing
              <span class="font-medium">{{ pageFrom }}</span>
              to
              <span class="font-medium">{{ pageTo }}</span>
              of
              <span class="font-medium">{{ pageTotal }}</span>
              results
            </span>
          </div>
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="pageTotal"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-full min-w-[32px] justify-center',
              default: {
                activeButton: {
                  variant: 'outline',
                },
              },
            }"
          />
        </div>
      </template>
    </UCard>
  </UContainer>
</template>
