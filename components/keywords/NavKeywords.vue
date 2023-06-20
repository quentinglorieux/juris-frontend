<template>
  <div class="nav-source pl-2">
    <div class="flex justify-center items-center py-2">
      <i class="pi pi-fw pi-tags"></i>
      <div class="pl-2 text-xl font-semibold">MOTS CLÉS</div>
    </div>
    
    <DataTable
      :value="listItems"
      v-model:filters="filter1"
      filterDisplay="menu"
      :globalFilterFields="['titre']"
      selectionMode="single"
      dataKey="id"
      responsiveLayout="scroll"
      class="p-datatable-ml"
      :scrollable="true"
      scrollHeight="flex"
      :resizableColumns="true"
      columnResizeMode="expand"
      @rowSelect="onRowSelect" 
    >
      <template #header>
        <div class="flex justify-content-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Effacer"
            class="p-button-outlined"
            @click="clearFilter1()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="filter1['global'].value"
              placeholder="Recherche"
            />
          </span>
        </div>
      </template>

      <Column field="titre" header="Mots-clés" :sortable="true"></Column>
      <Column
        field="commentaires.length"
        header="# Commentaires"
        :sortable="true"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup>
import { FilterMatchMode, FilterOperator } from "primevue/api";
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();
const listItems = computed(() => store.keywords);

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

const onRowSelect = (node) => {
  
  
  navStore.selectedKeywordID = node.data.id;
  
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