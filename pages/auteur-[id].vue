<template>
  <div> 
    <div class="titre-page">
          <h1>{{ route.params.id  }}</h1>
        </div>

        A {{ author  }} B

 
  Auteur: {{ route.params.id }}
  <li v-for="item in listItems"> 
    <ul>
      {{ item.titre }}
  </ul>
</li>
</div>
</template>



<script setup>
import { Directus } from "@directus/sdk";
import { useGlobalStore } from "~/stores/global";
const route = useRoute()
const store = useGlobalStore();

const directus = new Directus("https://jurisdirectus.rubidiumweb.eu/");

const listItems = ref([]);
const author = ref();
async function retrieveComments() {
  const publicData = await directus.items("commentaires").readByQuery({
    fields: ["titre,id"],
    filter: {
      "auteur_id": {
  "last_name": {
   "_eq": route.params.id
  }
 }
}
});
  var L = publicData.data;
  listItems.value = L;
}


// const { $directus } = useNuxtApp();
// async function retrieveAuthors() {
//   const { data: publicData } = await useAsyncData(() => {
//     return $directus.items("directus_users").readByQuery({
//       fields: ["first_name,last_name,role"],
//       filter: {
//   "last_name": {
//    "_eq": route.params.id
//   }
// }
//     });
//   });
//   console.log(publicData.data)
//   author.value = publicData.data;

// }


onMounted(() => {
  retrieveComments();
  retrieveAuthors();
})


watch(route, (newX) => {
retrieveComments() ;
})







</script>

