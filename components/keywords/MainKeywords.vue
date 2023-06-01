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
          {{ com.commentaires_id.titre}} <span v-if="com.commentaires_id.auteur_id"> by  {{ com.commentaires_id.auteur_id.first_name}} {{ com.commentaires_id.auteur_id.last_name}} </span>
          <Button class="mt-2 mx-2" @click="onCommentButtonClick(com)"> Read </Button>

        </ul>
      </div>
     </li>
    </div>

   
  </div>

</div>

<Sidebar
      v-model:visible="visible"
      position="right"
      :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
      class="layout-comment-sidebar"
    >
      <h3>{{ selectedCom.titre }} </h3>
      {{ selectedCom.id }}
      {{ selectedCom.content }}
      <!-- {{ selectedCom.keywords_id.keywords_id.titre }} -->
    </Sidebar>


</template>

<script setup>
const props = defineProps(["kw"]);

const selectedCom = ref("");
const visible = ref(false);
const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com.commentaires_id;
  console.log(com)
};


</script>

<style scoped>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
    min-width: 40%;
}

Button {
    background-color:  #0288D1;
    font-size: 0.85rem ;
    font-weight: 600;
    padding: 0.25rem 0.4rem;
    border-radius: 3px;
    margin-left: 2px;
    margin-top: 2px;
}

</style>
