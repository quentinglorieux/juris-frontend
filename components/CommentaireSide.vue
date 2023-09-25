<template>
  
  <div v-if="fetched_data" class="card2 bg-slate-100">


    <h1 class="text-center">{{ fetched_data.data.titre }}</h1>

    <div class="bg-slate-200 p-2">
    <h3>Résumé:</h3>
    <div v-html="fetched_data.data.abstract"></div>

</div>

  

    <h2></h2>
    <div v-html="parsedMarkdown"></div>

    <div class="bg-slate-200 p-2 mt-10">
    <h5>Citation :</h5>
    <div v-html="fetched_data.data.citation"></div>
</div>

    <!-- {{ prop.com.data.content }} -->
  </div>

</template>

<script setup>
const prop = defineProps(["com"]);
const fetched_data = ref()
import MarkdownIt from "markdown-it";

const md = new MarkdownIt();
const parsedMarkdown = ref()

// DataFetching of the selected Commentaires(id)
const { $directus } = useNuxtApp();
async function retrieveSourceData(id) {
    fetched_data.value = await useAsyncData(() => {
    return $directus.items("commentaires").readOne(id, {
      fields: ["id,titre,citation,abstract,content,auteur_type,auteur_name"],
    });
  });
  parsedMarkdown.value = md.render(fetched_data.value.data.content);
}


onMounted(() => {
    console.log(prop.com)
 retrieveSourceData(prop.com) 
});
</script>
