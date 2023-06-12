<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">

      <div >
        <Splitter
          class="mb-5 min-h-screen"
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
            
              <h3> {{ store.commentaires.titre }}</h3>
              <div> {{ store.commentaires.content }}</div>
              Commentaire : 
              {{ store.commentaires.id }}

            </div>
            <Button @click="()=>{navStore.comVisibility = false; store.commentaires={}}"> Close </Button>
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
//const sourceIsSelected = ref(false);
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
          comActiv.value = comId;
          navStore.comID = comId;
        } 
      }
      retrieveComments(comActiv.value);
    });
  }
  


});

// DataFetching of the selected Source(id)
const { $directus } = useNuxtApp();
async function retrieveSourceData(id) {

  source.value = await useAsyncData(() => {
    return $directus.items("sources").readOne(id, {
      fields: [
        "id,titre,type,meta,EditorJS,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre,theme_id.titre,theme_id.id",
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
         el.setAttribute("style", "background-color:rgb(240, 220, 210);");
        } else {
         el.setAttribute("style", "background-color:#ceffd5;");
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
