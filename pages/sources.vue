<template>
  <div class="flex">
   <div :style=" isNavSourceVisible ?  'width:350px' : 'width:0px' ">
    <NavSource 
      v-if="isNavSourceVisible"
      class=""
      @closeNavSource="() => (isNavSourceVisible = false)"
      @sourceSelected="(e) => (sourceSelection = e)"
    />
  </div>
    <NavSourceMinified
      v-if="isNavSourceVisible == false"
      @openNavSource="() => (isNavSourceVisible = true)"
    />
    <MainSource
      class=""
      :source="sourceSelection"
      @com-is-selected="(e) => navSourceVisibility(e)"
    />
  </div>
</template>

<script setup>
const sourceSelection = ref("");
const isNavSourceVisible = ref(true);

// DataFetching of Sources
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
const { $directus } = useNuxtApp();
async function retrieveData() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("sources").readByQuery({
      fields: [
      "titre,type,meta,EditorJS,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre,theme_id.titre",
    ],
    });
  });
  store.sources = publicData.value.data; //Storage of Sources data
}

onMounted(() => {
  if (!store.sources[0]) {
    retrieveData();
  }
});



function navSourceVisibility(e) {
  if (e == "") {
    isNavSourceVisible.value = true;
  } else {
    isNavSourceVisible.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
