<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source2</h1>
    </div>
    <div v-if="source">
      <div class="stick">
        <SourceNavBar />
      </div>

      <div class="">
        <Splitter class="mb-5" style="background-color: rgb(226 232 240); border: none">
          <SplitterPanel :size="75" class="">
            <div class="section" id="main-source"></div>

            <div>
              <h1>Titre : {{ source.data.titre }}</h1>
              <p v-if="source.data">Type : {{ source.data.type }}</p>
            </div>
            <div v-for="block in editorJScontent">
              <div v-html="block"></div>
            </div>
            <div class="section" id="keywords"></div>
            <h2>Mots Clés</h2>
            <SourceKeywords :source="source" />

            <div class="section" id="comments"></div>

            <h2>Commentaires</h2>
            <SourceComments
              :source="source"
              :comSelected="comActiv"
              @ComSelected="openWindowForComment"
            />

            <div class="section" id="themes"></div>
            <h2>Thèmes</h2>
            <SourceThemes :source="source" />
          </SplitterPanel>
          <SplitterPanel :size="25" v-if="sourceIsSelected">
            <div>
              {{ comActiv }}
            </div>
          </SplitterPanel>
        </Splitter>
        <h2>Traduction(s)</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import edjsHTML from "editorjs-html";
const comActiv = ref();
const sourceIsSelected = ref(false);
const props = defineProps(["source"]);

const emit = defineEmits(["comIsSelected"]);

const edjsParser = edjsHTML();
const editorJScontent = computed(() => {
  return edjsParser.parse(props.source.data.EditorJS);
});

const openWindowForComment = (com) => {
  if (com == comActiv.value) {
    comActiv.value = "";
    sourceIsSelected.value = false;
    emit("comIsSelected", false);
  } else {
    comActiv.value = com.id;
    sourceIsSelected.value = true;
    emit("comIsSelected", true);
  }
};

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
        if (el.getAttribute("data-linkedcomment") == el2.getAttribute("data-linkedcomment")) {
          el2.setAttribute("style", "background-color:rgb(240, 220, 210);");
          comActiv.value=comId
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
  min-width: 40%;
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
