<template>
  <div class="flex"> 
  <NavKeywords class="" @kwSelected = "(e) => kwSelection = e"/> 
  <MainKeywords class="" :kw = kwSelection.data />
  </div>
</template>

<script setup>
const kwSelection = ref('')
</script>


<!-- <template>
<li v-for="kw in listItems">
      <div class="flex">
        <ul class="mr-3 text-lg">
          {{
            kw.titre
          }}
          ({{  kw.commentaires.length }})
        </ul>
    </div>
    </li>
    
    </template>

<script setup>
import { Directus } from "@directus/sdk";
const config = useRuntimeConfig();
const directus = new Directus(config.public.API_BASE_URL);

const listItems = ref([]);
async function retrieveKeywords() {
  const publicData = await directus.items("keywords").readByQuery({
    fields: [
      "titre,meta,introduction,commentaires.id,commentaires.titre,commentaires.content",
    ]
  });
  var L = publicData.data;
  listItems.value = L;
}
retrieveKeywords();



</script> -->
