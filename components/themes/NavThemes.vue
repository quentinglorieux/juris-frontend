<template>
<div v-if="visible" class="nav-component">
    <div class="nav-title">
      <div><i class="pi pi-fw pi-list"></i> THEMES</div>
      <div>
        <button class="layout-topbar-button" @click="toggleNav()">
          <i class="pi pi pi-angle-double-left"></i>
        </button>
      </div>
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
        <div class="flex" style="justify-content:space-between">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined"
            @click="clearFilter1()"
          />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText v-model="filter1['global'].value" placeholder="Theme Search" />
          </span>
        </div>
      </template>
      <Column field="titre" header="Titre" :sortable="true"></Column>
      <Column field="meta" header="Meta" :sortable="true"></Column>
    </DataTable>
  </div>
  <div v-if="!visible" class="">
    <button class="layout-topbar-button" @click="toggleNav()">
      <i class="pi pi pi-angle-double-right"></i>
    </button>
  </div>
</template>



<script setup>
import { FilterMatchMode, FilterOperator } from "primevue/api";
const props = defineProps(["visible"]);
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();
const listItems = computed(() => store.themes);
function toggleNav() {
  navStore.toggleNav();
}

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
  navStore.selectedThemeID = node.data.id;
};


/*const sourceIsSelected = ref(false);
const emit = defineEmits(["themeSelected", "closeNavSource"]);
const onRowSelect = (node) => {
  emit("themeSelected", node);
  // console.log(node)
  sourceIsSelected.value = !sourceIsSelected.value;
};


/*import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
const listItems = computed(() => store.themes);
import { FilterMatchMode, FilterOperator } from "primevue/api";


const visibility=ref(true);
function togleVisibility(){
  visibility.value=!visibility.value
}*/

// const config = useRuntimeConfig();
// const directus = new Directus(config.public.API_BASE_URL);

// const listItems = ref([]);
// async function retrieveSources() {
//   const publicData = await directus.items("themes").readByQuery({
//     fields: [
//       "titre,introduction, sources.id,sources.titre",
//     ],
//   });
//   var L = publicData.data;
//   listItems.value = L;
// }
// retrieveSources();

</script>
