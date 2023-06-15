<template>
  <div class="flex">
    <NavSource
      v-if="store.sources"
      :visible="navStore.navVisibility"
      :listItems="store.sources"
    >
    </NavSource>

    <MainSource :sourceID="navStore.selectedSourceID"> </MainSource>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";

const navStore = useNavStore();
const store = useGlobalStore();

// var listItems= computed(() => store.sources);

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
onBeforeMount(() => {
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
