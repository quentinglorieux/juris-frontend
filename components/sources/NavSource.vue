<template>
  <div class="nav-source pl-2">
    <i class="pi pi-fw pi-file"></i>
    <span class="py-1 text-xl"> SOURCES </span>
    <div style="margin-bottom: 1em">
      <Button
        type="button"
        icon="pi pi-plus"
        label="Expand All"
        @click="expandAll()"
      />
      <Button
        type="button"
        icon="pi pi-minus"
        label="Collapse All"
        @click="collapseAll()"
      />
    </div>
    <Tree
      :value="nodes"
      v-model:expandedKeys="expandedKeys"
      :filter="true"
      filterMode="lenient"
      selectionMode="single"
      v-model:selectionKeys="selectedKey"
      @node-select="onNodeSelect"
    ></Tree>
  </div>
</template>

<script setup>
import dataJson from "~/assets/data/sourcenodes.json";

const emit = defineEmits(["sourceSelected"]);

const onNodeSelect = (node) => {
  emit("sourceSelected", node);
};

onMounted(() => {
  nodes.value = dataJson.root;
});

const nodes = ref(null);
const expandedKeys = ref({});
const selectedKey = ref(null);

const expandAll = () => {
  for (let node of nodes.value) {
    expandNode(node);
  }
  expandedKeys.value = { ...expandedKeys.value };
  console.log(expandedKeys.value);
};

const collapseAll = () => {
  expandedKeys.value = {};
};

const expandNode = (node) => {
  expandedKeys.value[node.key] = true;
  if (node.children && node.children.length) {
    for (let child of node.children) {
      expandNode(child);
    }
  }
};
</script>

<style scoped>
.nav-source {
  height: calc(100vh - 5rem);
  min-width: 300px;
}
.p-button {
  margin-right: 0.5rem;
}
</style>
