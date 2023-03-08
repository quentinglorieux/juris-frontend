<template>
    
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!source"> 
        <h1>Sélectionnez une Source </h1>
     </div>   
    <div v-if="source"> 
    <div  class="">
      <h1>Titre : {{ source.data.titre }}</h1>
      <p v-if="source.data">Type : {{ source.data.type }}</p>
      <div v-html="markdownToHtml"></div>
    </div>

    <h2>Mots Clés</h2>
    <SourceKeywords :source=source /> 


    <h2>Commentaires</h2>
    <SourceComments :source=source /> 

    <h2>Thèmes</h2>

    <h2>Traduction(s)</h2>
  
   
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

<style>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
    min-width: 40%;
}

</style>
