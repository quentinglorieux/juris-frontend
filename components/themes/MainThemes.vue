<template>
  <div class="flex flex-column p-3 w-full">
    <div v-if="!theme">
      <h1>Sélectionnez un Theme</h1>
    </div>
    <div v-if="theme">
      <div class="titre-page">
        <h1>  {{ theme.data.titre }}</h1>
      </div>
      <Splitter style="height: 55vh" layout="vertical">
              <div class="titre-page">
        <h1>Thème : {{ theme.data.titre }}</h1>
      </div>
        <SplitterPanel style="height:40vh">
          <ScrollPanel  style="height:100%">
          <div v-html="theme.data.introduction"></div>
          </ScrollPanel>
        </SplitterPanel>
        <SplitterPanel>
          <div class="theme-content">
          <div style="width:50%;">
            <h2>Mots Clefs</h2>
          </div>
          <div style="width:50%">
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
const oldID = ref();

function updateRoute(id) {
  navStore.selectedSourceID = id;
}

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

if (navStore.selectedThemeID) {
  retrieveThemeData(navStore.selectedThemeID);
  oldID.value = navStore.selectedThemeID;
}

onUpdated(() => {
  if (navStore.selectedThemeID != oldID.value) {
    retrieveThemeData(navStore.selectedThemeID);
  }
  oldID.value = navStore.selectedThemeID;

  if (navStore.selectedThemeID != oldID.value) {
    retrieveThemeData(navStore.selectedThemeID);
  }
  oldID.value = navStore.selectedThemeID;

  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    el.addEventListener("click", () => {
      const comments2 = document.getElementsByTagName("mark");
      for (const el2 of comments2) {
        var comId = el2.getAttribute("data-linkedcomment");
        if (
          el.getAttribute("data-linkedcomment") ==el2.getAttribute("data-linkedcomment") 
        ) {
          el2.setAttribute("style", "background-color:rgb(240, 220, 210);");
          comActiv.value = comId;
          retrieveComments(comId);
        } else {
          el2.setAttribute("style", "background-color:rgb(255, 248, 225);");
        }
      }
    });
  }
});
</script>
