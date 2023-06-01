<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <div class="stick">
        <SourceNavBar />
      </div>

      <div class="">
        <Splitter class="mb-5" style="background-color: rgb(226 232 240); border: none">
          <SplitterPanel :size="75" class="">
            <div class="section" id="main-source"></div>
            <div class="">
              <h1>Titre : {{ source.data.titre }}</h1>
              <p v-if="source.data">Type : {{ source.data.type }}</p>
              <div v-html="markdownToHtml"></div>
            </div>
            <div class="section" id="keywords"></div>
            <h2>Mots Clés</h2>
            <SourceKeywords :source="source" />

            <div class="section" id="comments"></div>

            <h2>Commentaires</h2>
            <SourceComments :source="source" @ComSelected="callback1" />

            <div class="section" id="themes"></div>
            <h2>Thèmes</h2>
            <SourceThemes :source="source" />
          </SplitterPanel>
          <SplitterPanel :size="25" v-if="sourceIsSelected">
            <div>
              {{ selComm.id }}
            </div>
          </SplitterPanel>
        </Splitter>
        <h2>Traduction(s)</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";

const selComm = ref();
const sourceIsSelected = ref(false);
const props = defineProps(["source"]);
const emit = defineEmits(["comIsSelected"]);
const markdownToHtml = computed(() => {
  return marked(props.source.data.content);
});

const callback1 = (com) => {
  if (com == selComm.value) {
    selComm.value = "";
    sourceIsSelected.value = false;
    emit("comIsSelected",false);
  } else {
    selComm.value = com;
    sourceIsSelected.value = true;
    emit("comIsSelected",true);
  }
};


watch(() => props.source, (first, second) => {
  if (second.data){
    if (first.data.titre!=second.data.titre){
    selComm.value = "";
    sourceIsSelected.value = false;
    emit("comIsSelected",false);
        }


  }
  
    });

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
