<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <div class="stick">
        <SourceNavBar />
      </div>
      <div class="section" id="main-source"></div>
      <div class="">
        <h1>Titre : {{ source.data.titre }}</h1>
        <p v-if="source.data">Type : {{ source.data.type }}</p>
        <div v-html="markdownToHtml"></div>
      </div>
      <div class="section" id="keywords"></div>
      <h2 id="keywords">Mots Clés</h2>
      <SourceKeywords :source="source" />

      <div class="section" id="comments"></div>
      <h2>Commentaires</h2>
      <SourceComments :source="source" />
      <div class="section" id="themes"></div>
      <h2 id="themes">Thèmes</h2>
      <SourceThemes :source="source" />

      <h2>Traduction(s)</h2>
      <div v-html="markdownToHtml"></div>
      <div v-html="markdownToHtml"></div>
      <div v-html="markdownToHtml"></div>
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";

const props = defineProps(["source"]);

const markdownToHtml = computed(() => {
  return marked(props.source.data.content);
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
  /* color: red !important; */
  /* offset-anchor: top 200px; */
}
</style>
