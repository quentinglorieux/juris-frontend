<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!theme">
      <h1>Sélectionnez un Theme</h1>
    </div>
    <div v-if="theme">


      <h1>Titre : {{ theme.data.titre }}</h1>

      <div v-html="theme.data.introduction"></div>

      <div class="section" id="keywords"></div>
      <h2>Sources</h2>
      <ul>
        <li v-for="source in theme.data.sources">
          <NuxtLink :to="{ name: 'sources' }" @click="updateRoute(source.id)">
            {{ source.titre }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();

function updateRoute(id) {
  store.source = id;
}

const props = defineProps(["theme"]);

import { Directus } from "@directus/sdk";
const config = useRuntimeConfig();
const directus = new Directus(config.public.API_BASE_URL);
async function retrieveComments(id) {
  const publicData = await directus.items("commentaires").readOne(id);
  comActiv.value = id;
  openWindowForComment(publicData);
  emit("comIsSelected", true);
}

onUpdated(() => {
  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    el.addEventListener("click", () => {
      const comments2 = document.getElementsByTagName("mark");
      for (const el2 of comments2) {
        var comId = el2.getAttribute("data-linkedcomment");
        if (
          el.getAttribute("data-linkedcomment") == el2.getAttribute("data-linkedcomment")
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

watch(
  () => props.source,
  (first, second) => {
    if (second.data) {
      if (first.data.titre != second.data.titre) {
        comActiv.value = "";
        sourceIsSelected.value = false;
        emit("comIsSelected", false);
      }
    }
  }
);
</script>

<style scoped>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
  min-width: 50%;
}
.stick {
  position: sticky;
  top: 5rem;
}
.section {
  position: relative;
  top: -8rem;
}
</style>
