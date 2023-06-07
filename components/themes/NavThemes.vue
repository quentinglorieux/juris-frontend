<template>

  <div v-if="visibility" class="nav-source pl-2" style="width: 350px">
    <div class="flex justify-center items-center py-2">
      <button class="layout-topbar-button" @click="togleVisibility()">
        <i class="pi pi-times"></i>
      </button>
      <i class="pi pi-fw pi-file"></i>
      <div class="text-xl font-semibold">THEMES</div>
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
  <div v-if="!visibility" class="">
    <button class="layout-topbar-button" @click="togleVisibility()">
      <i class="pi pi-bars"></i>
    </button>
  </div>
</template>



<script setup>
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
const listItems = computed(() => store.themes);
import { FilterMatchMode, FilterOperator } from "primevue/api";


const visibility=ref(true);
function togleVisibility(){
  visibility.value=!visibility.value
}

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
const emit = defineEmits(["themeSelected", "closeNavSource"]);
const onRowSelect = (node) => {
  emit("themeSelected", node);
  // console.log(node)
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
