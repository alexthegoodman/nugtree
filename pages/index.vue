<script lang="ts" setup>
// import { TreeView } from "@grapoza/vue-tree";
import { GET_STRAINS } from "~/graphql/queries/strains";
import type { Strain } from "~/gql/graphql";

const treeStore = useTreeStore();

const variables = computed(() => ({
  page: 1,
  limit: 10000,
  query: "",
}));

const { result, loading } = (await useQuery(GET_STRAINS, variables)) as any;
const strainData = computed(() => {
  return result.value?.getStrains || [];
}) as Ref<Strain[]>;

const selectedStrainData = computed(() =>
  strainData.value.find((strain) => strain.id === treeStore.selectedStrain)
);

// organize strainData into hierarchical structure
// based on femaleParent

const treeify = (
  list: any[],
  idAttr: string,
  parentAttr: string,
  childrenAttr: string
) => {
  let localList = JSON.parse(JSON.stringify(list));
  if (!idAttr) idAttr = "id";
  if (!parentAttr) parentAttr = "parent";
  if (!childrenAttr) childrenAttr = "children";

  var treeList = [] as any[];
  var lookup = {} as any;
  localList.forEach(function (obj: any, i: number) {
    let displayObj = obj;
    // if (displayObj.name && displayObj.categoryId) {
    if (displayObj?.femaleParent?.name && displayObj?.maleParent?.name) {
      displayObj.label = `${displayObj?.femaleParent?.name} x ${displayObj?.maleParent?.name}`;
      if (displayObj?.additionalParents?.length > 0) {
        displayObj.label += ` x ${displayObj?.additionalParents
          ?.map((p: any) => p.name)
          .join(" x ")}`;
      }
    } else {
      displayObj.label = ``;
    }

    lookup[obj[idAttr]] = displayObj;
    // obj[childrenAttr] = [];
    localList[i][childrenAttr] = [];
    // }
  });
  localList.forEach(function (obj: any) {
    if (obj[parentAttr] != null) {
      lookup[obj[parentAttr]][childrenAttr].push(obj);
    } else {
      treeList.push(obj);
    }
  });
  return treeList;
};

const strainDataByFemaleParent = computed(() => {
  const strains = strainData.value;

  const strainsByFemaleParent = treeify(
    strains,
    "id",
    "femaleParentId",
    "children"
  );

  return strainsByFemaleParent;
});
</script>

<template>
  <UContainer>
    <UCard>
      <template #header>
        <div class="flex flex-row justify-between items-center">
          <h1 class="text-2xl font-bold">NugTree</h1>

          <ULink to="/manager/strains/">Manage Strains</ULink>
        </div>
      </template>

      <div class="grid" style="grid-template-columns: 1fr 1fr">
        <TreePart :items="strainDataByFemaleParent" />
        <UCard v-if="treeStore.selectedStrain">
          <template #header>
            <h2 class="text-xl font-bold">Selected Strain</h2>
          </template>

          <h4>{{ selectedStrainData?.name }}</h4>

          <AiStrainQuestions
            v-if="selectedStrainData?.name"
            :key="selectedStrainData?.name"
            :name="selectedStrainData?.name"
          />
        </UCard>
      </div>
    </UCard>
  </UContainer>
</template>

<style></style>
