<template>
    
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!sourceNode"> 
        <h1>Sélectionnez une Source </h1>
        (par exemple Article 1 - Section 1)
     </div>   
    <div v-if="sourceNode"> 
    <div  class="">
      <h1>Source : {{ sourceNode.label }}</h1>
      <h2>Texte</h2>
      <p v-if="sourceNode.text">“{{ sourceNode.text }}”</p>
    </div>

    <h2>Mots Clés</h2>
    <SourceKeywords :sourceNode=sourceNode /> 


    <h2>Commentaires</h2>
    <SourceComments :sourceNode=sourceNode /> 

    <h2>Thèmes</h2>
  </div>

</div>
</template>

<script setup>
import textJson from "~/assets/data/sourcetext.json";

const props = defineProps(["sourceNode"]);
const found = ref("");

const nodes = ref(null);
onMounted(() => {
  nodes.value = textJson.root;
});

watch(
  () => props.sourceNode.key,
  (newKey) => {
    found.value = getTextByKey(newKey);
  }
);

function getTextByKey(key) {
  return nodes.value.filter(function (data) {
    console.log(data.key);
    return data.key == key;
  });
}


</script>

<style>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
    min-width: 600px !important;
}

</style>
