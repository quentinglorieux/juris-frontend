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
          <NuxtLink
            class="link"
            :to="{ name: 'sources' }"
            @click="updateRoute(source.id)"
          >
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

if (navStore.selectedThemeID){
retrieveThemeData(navStore.selectedThemeID);
oldID.value = navStore.selectedThemeID;
}

onUpdated(() => {
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
          el.getAttribute("data-linkedcomment") ==
          el2.getAttribute("data-linkedcomment")
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




.link {
	color: #18272F;
  position: relative;
  text-decoration: none;
  margin-right: 10px;
}

.link::before {
  content: '';
  position: absolute;
  width:100%;
  height: 1px;
  border-radius: 1px;
  background-color: #18272F;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform .3s ease-in-out;
}

.link:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}

</style>
