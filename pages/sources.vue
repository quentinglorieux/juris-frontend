<template>
  <div class="flex">
    <NavSource
      @sourceSelected="(e) => (sourceSelection = e)"
      :visible=navStore.navVisibility ></NavSource>
    <MainSource
      class=""
      :source="sourceSelection"
      
    />
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();
const sourceSelection = ref("");
const props = defineProps(["visible", "other"]);

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



</script>

<style scoped lang="scss">
.slayout-navbar {
  transform: translateX(-100px);
}
.slayin-navbar {
  transform: translateX(0%);
  transition-duration: 200ms;
}
</style>