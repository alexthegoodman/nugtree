<script setup>
import { VueFlow, useVueFlow } from "@vue-flow/core";

const defaultNode = {
  style: {
    backgroundColor: "grey",
  },
  width: 100,
  height: 100,
};

const nodes = ref([
  {
    ...defaultNode,
    id: "1",
    position: { x: 50, y: 50 },
    label: "Node 1",
  },
  {
    ...defaultNode,
    id: "3",
    position: { x: 250, y: 50 },
    label: "Node 3",
  },
  {
    ...defaultNode,
    id: "4",
    position: { x: 350, y: 50 },
    label: "Node 4",
  },
]);

const { addNodes } = useVueFlow({
  nodes,
});
</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <div style="height: 700px">
        <VueFlow />
        <ul class="mt-5">
          <li v-for="node in nodes" :key="node.id">
            {{ node.id }}: {{ node.position }}
          </li>
        </ul>
      </div>
    </UCard>
  </UContainer>
</template>
