<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
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
                        {{ store.commentaires.content }}
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

const props = defineProps(["sourceID"]);
const source = ref();
const oldID = ref();



import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();
const editorJScontent = computed(() => {
  return edjsParser.parse(source.value.data.EditorJS);
});

onMounted(()=>{
  if (store.sources[0]) {retrieveSourceData(navStore.selectedSourceID)};
})

onUpdated(() => {
  if (navStore.selectedSourceID != oldID.value) {
    navStore.comVisibility=false;
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
        "id,titre,type,meta,EditorJS,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre,commentaires.keywords_id.keywords_id.id,theme_id.titre,theme_id.id",
      ],
    });
  });
  
  store.sources[store.sources.findIndex((x) => x.id === id)] = source.value.data;

}


async function retrieveComments(id) {
  const { data } = await useAsyncData(() => {
    return $directus.items("commentaires").readOne(id);
  });

  store.commentaires=data.value;
  navStore.comVisibility=true;
  navStore.navVisibility=false;
}

store.$subscribe((mutation, state) => {
  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    if (el.getAttribute("data-linkedcomment") == store.commentaires.id) {
el.setAttribute("style", "background-color:var(--surface-a);");
          comActiv.value = comId;
        } else {
          el.setAttribute("style", "background-color:var(--surface-b);");
        }
      }
})



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