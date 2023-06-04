<template>

  <div v-if="visible" class="nav-source pl-2" style="width: 350px">
    <div class="flex justify-center items-center py-2">
      <button class="layout-topbar-button" @click="toggleNav()">
        <i class="pi pi-times"></i>
      </button>
      <i class="pi pi-fw pi-file"></i>
      <div class="text-xl font-semibold">SOURCES</div>
    </div>
    
    <DataTable
      :value="listItems"
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
            <InputText v-model="filter1['global'].value" placeholder="Source Search" />
          </span>
        </div>
      </template>
      <Column field="titre" header="Titre" :sortable="true"></Column>
      <Column field="meta" header="Meta" :sortable="true"></Column>
    </DataTable>
  </div>
  <div v-if="!visible" class="">
    <button class="layout-topbar-button" @click="toggleNav()">
      <i class="pi pi-bars"></i>
    </button>
  </div>
</template>

<script setup>

import { FilterMatchMode, FilterOperator } from "primevue/api";

const props = defineProps(['visible'])
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();

function toggleNav(){
  navStore.toggleNav()
}





import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
const listItems = computed(() => store.sources);


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
const sourceIsSelected = ref(false);
const emit = defineEmits(["sourceSelected", "closeNavSource"]);
const onRowSelect = (node) => {
  emit("sourceSelected", node);
  sourceIsSelected.value = !sourceIsSelected.value;
};



</script>

<style lang="scss" scoped>
Button {
  /* background-color: #0288d1; */
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
}
.nav-source {
  height: calc(100vh - 5rem);
  // min-width: 350px;
  // width: 350px;
}
.p-button {
  margin-right: 0.5rem;
}

.layout-topbar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: var(--text-color-secondary);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    color: var(--text-color);
    background-color: var(--surface-hover);
  }

  i {
    font-size: 1.5rem;
  }

  span {
    font-size: 1rem;
    display: none;
  }
}

.slayout-navbar {
  transform: translateX(-100%);
  transition-duration: 200ms;
}
.slayin-navbar {
  transform: translateX(0%);
  transition-duration: 500ms;
}
</style>
