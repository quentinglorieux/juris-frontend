<template>
  <div class="flex">
    <NavKeywords />
    <MainKeywords  :sourceID="navStore.selectedKeywordID" />
    <!-- <MainKeywords class="" :kw="navStore.selectedKeywordID" />  -->
    
  </div>
</template>

<script setup>


// DataFetching of Keywords
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
import { useNavStore } from "~/stores/navigation";
const navStore = useNavStore();

const { $directus } = useNuxtApp();
async function retrieveKeywords() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("keywords").readByQuery({
      fields: [
        "titre,id,meta,introduction,commentaires.commentaires_id.titre,commentaires.commentaires_id.id,commentaires.commentaires_id.auteur_id.first_name,commentaires.commentaires_id.auteur_id.last_name",
      ],
    });
  });
  store.keywords = publicData.value.data; //Storage of Keywords data
}

onMounted(() => {
  if (!store.keywords[0]) {
    retrieveKeywords();
  }
});
</script>