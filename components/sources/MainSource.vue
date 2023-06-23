<template>
  <div class="flex flex-column p-1 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <div>
        <Splitter>
          <SplitterPanel :size="40" class="">
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
          <SplitterPanel :size="50" v-if="sourceIsSelected">
            <div>
              {{ comActiv }}
            </div>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { marked } from "marked";

const props = defineProps(["sourceID"]);
const source = ref();
const oldID = ref();

import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();
const editorJScontent = computed(() => {
  // return edjsParser.parse(props.source.data.EditorJS);
});

onMounted(()=>{
  if (store.sources[0]) {retrieveSourceData(navStore.selectedSourceID)};
})

onUpdated(() => {
  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    el.addEventListener("click", () => {
      for (const el2 of comments) {
      for (const el2 of comments) {
        var comId = el2.getAttribute("data-linkedcomment");
        if (el.getAttribute("data-linkedcomment") == comId) {
          navStore.comID = comId;
        }
        if (el.getAttribute("data-linkedcomment") == comId) {
          navStore.comID = comId;
        } 
      }
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
  const publicData = await directus.items("commentaires").readOne(id);
  comActiv.value = id;
  openWindowForComment(publicData);
  emit("comIsSelected", true);
}




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
