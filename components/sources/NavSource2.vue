<template>
  <div class="nav-source pl-2">
    <div class="flex justify-center items-center py-2">
      <i class="pi pi-fw pi-file"></i>
      <div class="text-xl font-semibold">SOURCES</div>
    </div>
    

    <DataTable
      :value="listItems"
      v-model:selection="selectedSource"
      v-model:filters="filters1"
      filterDisplay="menu"
      :globalFilterFields="['titre']"
      selectionMode="single"
      dataKey="id"
      responsiveLayout="scroll"
      class="p-datatable-sm"
    >
    <template #header>
                    <div class="flex justify-content-between">
                        <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined" @click="clearFilter1()"/>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters1['global'].value" placeholder="Keyword Search" />
                        </span>
                    </div>
                </template>
                
      <Column field="titre" header="Titre"></Column>
    </DataTable>
  </div>
  <div v-if="selectedSource" v-html="markdownToHtml"></div>
</template>

<script setup>
import dataJson from "~/assets/data/sourcenodes.json";
import { marked } from "marked";
import { Directus } from "@directus/sdk";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const directus = new Directus("https://devdirectus.rubidiumweb.eu");

const listItems = ref([]);

async function publicData() {
  const publicData = await directus.items("sources").readByQuery();
  var L = publicData.data;
  listItems.value = L;
}
publicData();

const selectedSource = ref();

const markdownToHtml = computed(() => {
  return marked(selectedSource.value.content);
});

const filters1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  titre: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});

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
Button {
  background-color: #0288d1;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
}
.nav-source {
  height: calc(100vh - 5rem);
  min-width: 300px;
  width: 300px;
}
.p-button {
  margin-right: 0.5rem;
}
</style>
