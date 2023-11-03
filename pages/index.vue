<script lang="ts" setup>
// import { TreeView } from "@grapoza/vue-tree";
import { GET_STRAINS } from "~/graphql/queries/strains";

const variables = computed(() => ({
  page: 1,
  limit: 10000,
  query: "",
}));

const { result, loading } = (await useQuery(GET_STRAINS, variables)) as any;
const strainData = computed(() => {
  return result.value?.getStrains || [];
});

// organize strainData into hierarchical structure
// based on femaleParent

const treeify = (list, idAttr, parentAttr, childrenAttr) => {
  let localList = JSON.parse(JSON.stringify(list));
  if (!idAttr) idAttr = "id";
  if (!parentAttr) parentAttr = "parent";
  if (!childrenAttr) childrenAttr = "children";

  var treeList = [];
  var lookup = {};
  localList.forEach(function (obj, i) {
    let displayObj = obj;
    // if (displayObj.name && displayObj.categoryId) {
    if (displayObj?.femaleParent?.name && displayObj?.maleParent?.name) {
      displayObj.label = `${displayObj?.femaleParent?.name} x ${displayObj?.maleParent?.name} (${displayObj?.name})`;
    } else {
      displayObj.label = `${displayObj?.name}`;
    }

    lookup[obj[idAttr]] = displayObj;
    // obj[childrenAttr] = [];
    localList[i][childrenAttr] = [];
    // }
  });
  localList.forEach(function (obj) {
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
      <ULink to="/manager/strains/">Manage Strains</ULink>
      <!-- display strainDataByFemaleParent usinng TreePart -->
      <TreePart :items="strainDataByFemaleParent" />
      <!-- {{ strainDataByFemaleParent }} -->
    </UCard>
  </UContainer>
</template>

<style></style>
