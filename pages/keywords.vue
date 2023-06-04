<template>
  <div class="flex">
    <NavKeywords class="" @kwSelected="(e) => (kwSelection = e)" />
    <MainKeywords class="" :kw="kwSelection.data" />
  </div>
</template>

<script setup>
const kwSelection = ref("");

// DataFetching of Keywords
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();
const { $directus } = useNuxtApp();
async function retrieveKeywords() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("keywords").readByQuery({
      fields: [
        "titre,meta,introduction,commentaires.commentaires_id.titre,commentaires.commentaires_id.id,commentaires.commentaires_id.auteur_id.first_name,commentaires.commentaires_id.auteur_id.last_name",
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
