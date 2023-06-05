<template>
  <div class="flex">
    <NavSource 
     :visible="navStore.navVisibility"> 
    </NavSource>
    <MainSource 
      class="" 
      :sourceID="navStore.selectedSourceID"> 
  </MainSource>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";

const navStore = useNavStore();
const store = useGlobalStore();

// DataFetching of Sources
const { $directus } = useNuxtApp();
async function retrieveData() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("sources").readByQuery({
      fields: ["id,titre"],
    });
  });
  store.sources = publicData.value.data; //Storage of Sources data
}

// retrieve initial source data (id and title only)
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
