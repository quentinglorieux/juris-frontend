<template>
  <div class="flex flex-column p-1 w-full">
  
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-else>
      <div>
        <div class="titre-page">
              <h1>{{ source.data.titre }}</h1>
              <p v-if="source.data">[{{ source.data.type }}]</p>
            </div>
        <Splitter>
          <SplitterPanel :size="60" class="">
            <ScrollPanel>
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

          <SplitterPanel :size="40">
            
            <div class="split-menu">
              <div>
              <TabView>
                <TabPanel header="Commentaires">
                  <div class="section" id="comments"></div>
                  <SourceComments
                    :source="source"
                    :comSelected="store.commentaires"
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

            <div class="source-commentaire" v-if="navStore.comVisibility">
              <div class="close-button">
                <Button
                  icon="pi pi-times"
                  text
                  rounded
                  @click="
                    () => {
                      navStore.comVisibility = false;
                      store.commentaires = {};
                    }
                  "
                >
                </Button>
              </div>
              <TabView>
                <TabPanel>
                  <template #header>
                    <span
                      >{{ store.commentaires.titre }}</span
                    >
                  </template>
                  <ScrollPanel
                    style="margin: -1rem; height: 100%; background-color: white"
                  >          
                    <div class="p-3">
                      <CommentaireSide :com="store.commentaires.id"></CommentaireSide>
                      
                      <!-- <div v-html="store.commentaires.content"></div> -->
                     
                    </div>
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
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();

const props = defineProps(["sourceID"]);
const source = ref();
const oldID = ref();

import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();
const editorJScontent = computed(() => {
  if (source.value && source.value.data){
    return edjsParser.parse(source.value.data.texte);
  }
  else{
    return null
  }
  
});


onMounted(() => {
  
  if (navStore.selectedSourceID) {
    retrieveSourceData(navStore.selectedSourceID);
  }
});

onUpdated(() => {

  if (navStore.selectedSourceID != oldID.value) {
    navStore.comVisibility = false;
    retrieveSourceData(navStore.selectedSourceID);
  }

  oldID.value = navStore.selectedSourceID;

  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    el.addEventListener("click", () => {
      for (const el2 of comments) {
        var comId = el2.getAttribute("data-linkedcomment");
        if (el.getAttribute("data-linkedcomment") == comId) {
          navStore.comID = comId;
        }
      }
      retrieveComments(navStore.comID);
    });
  }
});

// DataFetching of the selected Source(id)
const { $directus } = useNuxtApp();
async function retrieveSourceData(id) {
  source.value = await useAsyncData(() => {
    return $directus.items("sources").readOne(id, {
      fields: [
        "id,titre,type,meta,texte,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre,commentaires.keywords_id.keywords_id.id,theme_id.titre,theme_id.id",
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

  store.commentaires = data.value;
  navStore.comVisibility = true;
  navStore.navVisibility = false;
}

store.$subscribe((mutation, state) => {
  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    if (el.getAttribute("data-linkedcomment") == store.commentaires.id) {
      el.setAttribute("style", "background-color:var(--surface-a);");
    } else {
      el.setAttribute("style", "background-color:var(--surface-c);");
    }
  }
});
</script>