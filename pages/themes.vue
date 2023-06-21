<template>
  <div class="flex">
    <NavThemes
      v-if="store.sources"
      :visible="navStore.navVisibility"
      :listItems="store.sources"
    >
    </NavThemes>
    <!-- <NavThemes  @themeSelected="(e) => (themeSelection = e)" /> -->
    <MainThemes class="min-h-screen" :themeID="navStore.selectedThemeID"/>
    <!-- :theme="themeSelection"  -->
  </div>
</template>

<script setup>
const themeSelection = ref("");

// DataFetching of Themes
import { useNavStore } from "~/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();


const { $directus } = useNuxtApp();
async function retrieveFullThemesData() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("themes").readByQuery({
      fields: [
        "id,titre,introduction,sources.id,sources.titre",
      ],
    });
  });
  store.themes = publicData.value.data; //Storage of Themes data
}

onMounted(() => {
    retrieveFullThemesData();

});





</script>

<style scoped lang="scss">

</style>