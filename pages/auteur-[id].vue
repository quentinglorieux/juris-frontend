<template>
  Auteur: {{ route.params.id }}
  <li v-for="item in listItems">
    <ul>
      {{
        item.titre
      }}
    </ul>
  </li>
</template>

<script setup>
const route = useRoute();

const listItems = ref([]);

const { $directus } = useNuxtApp();
async function retrieveAuthors() {
  listItems.value = await useAsyncData(() => {
    return $directus.items("authors").readByQuery({
      fields: ["titre,content,id,auteur_id.id,auteur_id.first_name"],
      filter: {
        auteur_id: {
          last_name: {
            _eq: route.params.id,
          },
        },
      },
    });
  });
}

onMounted(() => {
  retrieveAuthors();
});
</script>
