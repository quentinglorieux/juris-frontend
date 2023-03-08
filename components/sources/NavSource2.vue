<template>
  <div class="nav-source pl-2">
    <div class="flex justify-center items-center py-2">
      <i class="pi pi-fw pi-file"></i>
      <div class="text-xl font-semibold">SOURCES</div>
    </div>
    <DataTable
      :value="listItems"
      v-model:selection="selectedSource"
      v-model:filters="filter1"
      filterDisplay="menu"
      :globalFilterFields="['titre']"
      selectionMode="single"
      dataKey="id"
      responsiveLayout="scroll"
      class="p-datatable-sm"
      :scrollable="true"
      scrollHeight="flex"
      :resizableColumns="true"
      columnResizeMode="fit"
      @rowSelect="onRowSelect"
    >
      <template #header>
        <div class="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilter1()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filter1['global'].value"
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </template>

      <Column field="titre" header="Titre" :sortable="true"></Column>
      <Column field="meta" header="Date" :sortable="true"></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { Directus } from "@directus/sdk";
import { FilterMatchMode, FilterOperator } from "primevue/api";

const directus = new Directus("https://devdirectus.rubidiumweb.eu");

const listItems = ref([]);
async function retrieveSources() {
  const publicData = await directus.items("sources").readByQuery({
    fields: ["titre,type,meta,content,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre"],
  });
  var L = publicData.data;
  listItems.value = L;
}
retrieveSources();

const filter1 = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  titre: {
    operator: FilterOperator.AND,
    constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
  },
});
const clearFilter1 = () => {
  initFilters1();
};
const initFilters1 = () => {
  filter1.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    titre: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  };
};

const emit = defineEmits(["sourceSelected"]);
const onRowSelect = (node) => {
  emit("sourceSelected", node);
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
  min-width: 350px;
  width: 350px;
}
.p-button {
  margin-right: 0.5rem;
}
</style>
