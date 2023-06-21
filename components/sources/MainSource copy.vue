<template>
  <div class="flex flex-column p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <Splitter>
        <SplitterPanel :size="40">
          <ScrollPanel>
            <div id="main-source"></div>
            <div class="p-3" v-for="block in editorJScontent">
              <div v-html="block"></div>
            </div>
            <ScrollTop
              target="parent"
              :threshold="100"
              class="custom-scrolltop"
              icon="pi pi-arrow-up"
            />
          </ScrollPanel>
        </SplitterPanel>

        <SplitterPanel :size="60" >
          <div class="titre-page">
            <h1>{{ source.data.titre }}</h1>
            <h3 v-if="source.data">[{{ source.data.type }}]</h3>
          </div>
          <div class="split-menu">
            <div>
              <TabView>
                <TabPanel header="Commentaires">
                  <SourceComments
                    :source="source"
                    :comSelected="comActiv"
                    @ComSelected="openWindowForComment"
                  />
                </TabPanel>
                <TabPanel header="Mots Clefs">
                  <SourceKeywords :source="source" />
                </TabPanel>
                <TabPanel header="Thèmes">
                  <SourceThemes :source="source" />
                </TabPanel>
                <TabPanel header="Traduction(s)">
                  <h2>traduction(s?)</h2>
                </TabPanel>
              </TabView>
            </div>

            <div class="source-commentaire" v-if="navStore.comVisibility">
              
                <div class="close-button">
                  <Button
                    icon="pi pi-times"
                    text
                    rounded
                    @click="navStore.comVisibility = false"
                  >
                  </Button>
                </div>
                <TabView>
                  <TabPanel >
                    <template #header>
                      <span><i class="pi pi-file-edit"></i>  Commentaire actif {{ comActiv }}</span>
                    </template>
                    <ScrollPanel style=" margin:-1rem; height:100%; background-color:white;">
                      <p class="p-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        
                      </p>
                      <ScrollTop
                        target="parent"
                        :threshold="100"
                        class="custom-scrolltop"
                        icon="pi pi-arrow-up"
                      />
                    </ScrollPanel>
                  </TabPanel>
                  <TabPanel>
                    <template #header>
                      <span>Mots Clefs</span>
                    </template>
                  </TabPanel>
                  <TabPanel>
                    <template #header>
                      <span>Auteurs</span>
                    </template>
                  </TabPanel>
                </TabView>
              
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
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
          el2.setAttribute("style", "background-color:var(--surface-a);");
          comActiv.value = comId;
        } else {
          el2.setAttribute("style", "background-color:var(--surface-b);");
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
.stick {
  position: sticky;
  top: 5rem;
}
</style>
