<template>
  <div class="flex">
    <NavThemes  @themeSelected="(e) => (themeSelection = e)" />
    <MainThemes :theme="themeSelection"/>
  </div>
</template>

<script setup>
// DataFetching of Themes
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
const { $directus } = useNuxtApp();
async function retrieveData() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("themes").readByQuery({
      fields: [
        "titre,introduction,sources.id,sources.titre",
      ],
    });
  });
  store.themes = publicData.value.data; //Storage of Themes data
}

onMounted(() => {
  if (!store.themes[0]) {
    retrieveData();
  }
});
</script>

<script setup>
const themeSelection = ref("");



</script>

<style scoped lang="scss">

</style>
