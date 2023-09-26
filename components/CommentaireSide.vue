<template>
  <div class="static"> 
    <Button class="absolute top-8 left-4" @click="exportToPDF('commentaire.pdf', pdfSection , documentOptions, options)" label="Exporter en PDF" icon="pi pi-file-pdf" />

  <div v-if="fetched_data" class="card2 bg-slate-100 mt-2" ref="pdfSection">


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

      


  </div>
</div>
</template>

<script setup>
import MarkdownIt from "markdown-it";
import { exportToPDF } from '#imports'
const pdfSection = ref<HTMLElement | null>(null)

const prop = defineProps(["com"]);

const documentOptions = {
 orientation: 'p',
 unit: 'mm',
 format: 'a4',
 putOnlyUsedFonts:true,
}

const options = {
   autoPaging : 'text',
   width : 206,
   windowWidth : 950,
   margin : 2

}

const fetched_data = ref()
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
