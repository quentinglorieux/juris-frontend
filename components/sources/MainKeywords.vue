<template>
    
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!kw"> 
        <h1>Sélectionnez un Mot-clé </h1>
     </div>   
    <div v-if="kw"> 
    <div  class="">
      <h1>Titre : {{ kw.titre }}</h1>
      <h2>Introduction : {{ kw.introduction }}</h2>
        <li v-for="com in kw.commentaires">
        <div> 
        <ul class="mr-3 text-lg">
          {{
            com.commentaires_id.titre
          }}
        </ul>
      </div>
     </li>
    </div>

   
  </div>

</div>
</template>

<script setup>
const props = defineProps(["kw"]);


</script>

<style>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
    min-width: 40%;
}

</style>
