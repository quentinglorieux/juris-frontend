<template>
  <div class="pl-4">
    <li v-for="com in source.data.commentaires">
      <div class="flex">
        <ul class="mr-3 text-lg">
          {{
            com.titre
          }}
        </ul>
        
        <NuxtLink :to="{name:'auteur-id',params:{ id:com.auteur_id.last_name} }"> By {{com.auteur_id.first_name}} {{com.auteur_id.last_name}} </NuxtLink>
        <Button v-if="comSelected == com.id" @click="togleCommentPanel(com)">
           Close
        </Button>
        <Button v-else @click="togleCommentPanel(com)"> Read </Button>
      </div>
    </li>
  </div>
</template>

<script setup>
const props = defineProps(["source", "comSelected"]);
const emit = defineEmits(["ComSelected"]);
import { useCounterStore } from "@/store/counter";
const store = useCounterStore();

function togleCommentPanel(com) {
  emit("ComSelected", com);
  if (store.comID==com.id) {
    store.comID = "";
    
  } else {
    console.log("sfddfs")
    store.comID=com.id
    store.closeNav()
  }
}
</script>

<style scoped>
Button {
  background-color: #0288d1;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
  z-index: 0;
}
a{
  margin-right:10px;
}
</style>
