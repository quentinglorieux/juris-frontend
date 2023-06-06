<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <!-- <div class="stick">
        <SourceNavBar />
      </div> -->

      <div class="">
        <Splitter
          class="mb-5"
          style="background-color: rgb(226 232 240); border: none"
        >
          <SplitterPanel :size="50" class="">
            <div class="section" id="main-source"></div>

            <div>
              <h1>Titre : {{ source.data.titre }}</h1>
              <p v-if="source.data">Type : {{ source.data.type }}</p>
            </div>
            <div v-for="block in editorJScontent">
              <div v-html="block"></div>
            </div>
<div class="pt-3 pr-2"> 
            <TabView>
              <TabPanel header="Commentaires">
                <div class="section" id="comments"></div>
                <SourceComments
                  :source="source"
                  :comSelected="comActiv"
                  @ComSelected="openWindowForComment"
                />
              </TabPanel>

              <TabPanel header="Mots-Clés">
                <div class="section" id="keywords"></div>
                <SourceKeywords :source="source" />
              </TabPanel>

              <TabPanel header="Thèmes">
                <div class="section" id="themes"></div>
                <SourceThemes :source="source" />
              </TabPanel>

              <TabPanel header="Traduction(s)">
                <h2>Traduction(s)</h2>
              </TabPanel>
              
            </TabView>
          </div>
          </SplitterPanel>
          <SplitterPanel :size="50" v-if="navStore.comVisibility">
            <div>
              {{ comActiv }}
            </div>
            <Button @click="navStore.comVisibility = false"> Close </Button>
          </SplitterPanel>
        </Splitter>
     
      </div>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();

const comActiv = ref();
const sourceIsSelected = ref(false);
const props = defineProps(["sourceID"]);
const source = ref();
const oldID = ref();

const emit = defineEmits(["comIsSelected"]);

import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();
const editorJScontent = computed(() => {
  return edjsParser.parse(source.value.data.EditorJS);
});

onUpdated(() => {
  if (navStore.selectedSourceID != oldID.value) {
    retrieveSourceData(navStore.selectedSourceID);
  }
  // console.log(store.sources[store.sources.findIndex(x => x.id === navStore.selectedSourceID )].type)
  oldID.value = navStore.selectedSourceID;

  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    el.addEventListener("click", () => {
      for (const el2 of comments) {
        var comId = el2.getAttribute("data-linkedcomment");
        if (el.getAttribute("data-linkedcomment") == comId) {
          el2.setAttribute("style", "background-color:rgb(240, 220, 210);");
          comActiv.value = comId;
        } else {
          el2.setAttribute("style", "background-color:#ceffd5;");
        }
      }
      retrieveComments(comActiv.value);
    });
  }
});

// DataFetching of the selected Sources
const { $directus } = useNuxtApp();
async function retrieveSourceData(id) {
  source.value = await useAsyncData(() => {
    return $directus.items("sources").readOne(id, {
      fields: [
        "id,titre,type,meta,EditorJS,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre,theme_id.titre",
      ],
    });
  });
  store.sources[store.sources.findIndex((x) => x.id === id)] =
    source.value.data;
}

async function retrieveComments(id) {
  const { data } = await useAsyncData(() => {
    return $directus.items("commentaires").readOne(id);
  });
  comActiv.value = id;
  emit("comIsSelected", true);
  openWindowForComment(data.value);
}

const openWindowForComment = (com) => {
  if (com == comActiv.value) {
    comActiv.value = "";
    sourceIsSelected.value = false;
    emit("comIsSelected", false);
  } else {
    comActiv.value = com.id;
    sourceIsSelected.value = true;
    emit("comIsSelected", true);
    navStore.comVisibility = true;
  }
};

watch(
  () => source,
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
