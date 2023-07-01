<template>
  <div class="flex flex-column p-3 w-full">
    <div v-if="!theme">
      <h1>Sélectionnez un Theme</h1>
    </div>
    <div v-if="theme">
      <div class="titre-page">
        <h1>Thème : {{ theme.data.titre }}</h1>
      </div>
      <Splitter style="height: 55vh" layout="vertical">
        <div class="titre-page">
          <h1>Thème : {{ theme.data.titre }}</h1>
        </div>
        <SplitterPanel style="height: 40vh">
          <ScrollPanel style="height: 100%">
            <div v-html="theme.data.introduction"></div>
          </ScrollPanel>
        </SplitterPanel>
        <SplitterPanel>
          <div class="theme-content">
            <div style="width: 50%">
              <h2>Mots Clefs</h2>
            </div>
            <div style="width: 50%">
              <h2>Sources</h2>
              <ul>
                <li v-for="source in theme.data.sources">
                  <NuxtLink
                    class="hover:bg-sky-200"
                    :to="{ name: 'sources' }"
                    @click="updateRoute(source.id)"
                  >
                    {{ source.titre }}</NuxtLink
                  >
                </li>
              </ul>
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();

const theme = ref();
// DataFetching of the selected Themes
const { $directus } = useNuxtApp();
async function retrieveThemeData(id) {
  theme.value = await useAsyncData(() => {
    return $directus.items("themes").readOne(id, {
      fields: ["id,titre,introduction,sources.id,sources.titre"],
    });
  });
}
onMounted(() => {
  retrieveThemeData(navStore.selectedThemeID);
});

navStore.$subscribe((mutation, state) => {
  retrieveThemeData(navStore.selectedThemeID);
});
</script>
