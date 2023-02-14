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
      >
      </Button>
    </div>
    <Tree :value="nodes" v-model:expandedKeys="expandedKeys" :filter="true" filterMode="lenient"></Tree>
  </div>
</template>

<script setup>
// import NodeService from '@/utils/NodeService';
import dataJson from "@/assets/data/treenodes.json";

onMounted(() => {
  // nodeService.value.getTreeNodes().then(data => nodes.value = data);
  nodes.value = dataJson.root;
});



const nodes = ref(null);
// const nodeService = ref(new NodeService());
const expandedKeys = ref({});

const expandAll = () => {
  for (let node of nodes.value) {
    expandNode(node);
  }
  expandedKeys.value = { ...expandedKeys.value };
  console.log(expandedKeys.value)
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
  width: 300px;
}
.p-button {
  margin-right: 0.5rem;
}
</style>

