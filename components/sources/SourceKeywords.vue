<template>
  <div class="flex">
    <div v-for="com in source.data.commentaires">
      <Tag
        v-for="kw in com.keywords_id"
        class="mr-2 text-sm"
        severity="info"
        :value="kw.keywords_id.titre"
      ></Tag>
    </div>

  </div>
</template>

<script setup>
import { Directus } from "@directus/sdk";

const props = defineProps(["source"]);

const config = useRuntimeConfig();
const directus = new Directus(config.public.API_BASE_URL);

const listItems = ref([]);
async function retrieveKeywords() {
  const publicData = await directus.items("keywords").readByQuery();
  var L = publicData.data;
  listItems.value = L;
}
retrieveKeywords();
</script>
