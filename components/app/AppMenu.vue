<script setup>
import { Directus } from "@directus/sdk";
const directus = new Directus("https://devdirectus.rubidiumweb.eu");

const listItems = ref([]);
async function retrieveAuthors() {
  const publicData = await directus.items("directus_users").readByQuery({
    fields: ["first_name,last_name,role"],
    filter: {
      role: {
        _starts_with: "aeeefb57-7b36",
      },
    },
  });
  var L = publicData.data;
  listItems.value = L;
  for (let author of listItems.value) {
    model.value[1].items[3].items.push({
      label: author.last_name,
      icon: "pi pi-fw pi-bookmark",
      to: "/auteur-" + author.last_name,
    });
  }
}

const model = ref([
  {
    label: "Accueil",
    items: [{ label: "Accueil", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    label: "Entrées",
    items: [
      { label: "Sources", icon: "pi pi-fw pi-file", to: "/sources" },
      { label: "Thèmes", icon: "pi pi-fw pi-list", to: "/themes" },
      { label: "Mots Clés", icon: "pi pi-fw pi-tags", to: "/keywords" },
      { label: "Auteurs", icon: "pi pi-fw pi-user", items: [] },
    ],
  },
  {
    label: "Visualisation",
    items: [{ label: "Map", icon: "pi pi-fw pi-share-alt", to: "/map" }],
  },
]);
// add authors
onMounted(() => {
  retrieveAuthors();
});
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
