<template>
  Auteur {{ route.params.id }}
  <li v-for="item in listItems"> 
    <ul>
      {{ item.titre }}
  </ul>
</li>
</template>

<script setup>
import { Directus } from "@directus/sdk";
const route = useRoute()
console.log(route.params.id)

const directus = new Directus("https://devdirectus.rubidiumweb.eu");

const listItems = ref([]);
async function retrieveSources() {
  const publicData = await directus.items("commentaires").readByQuery({
    fields: ["titre,content,id,auteur_id.id,auteur_id.first_name"],
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
retrieveSources();
</script>
