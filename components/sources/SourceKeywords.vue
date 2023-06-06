<template>
  <div class="flex">
    <NuxtLink to="/keywords">
        <Tag
          v-for="kw in kwList"
          class="mr-2 text-sm"
          severity="info"
          icon="pi pi-link"
          :value="kw"
          @click="updateRoute(kw.id)"
        >
      </Tag>
      </NuxtLink>
<!-- 
    <div v-for="com in source.data.commentaires">
      
      <NuxtLink to="/keywords">
        <Tag
          v-for="kw in com.keywords_id"
          class="mr-2 text-sm"
          severity="info"
          icon="pi pi-link"
          :value="kw.keywords_id.titre"
          @click="updateRoute(kw.id)"
        >
      </Tag>
      </NuxtLink>
    </div> -->
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();

// import { Directus } from "@directus/sdk";
const kwList = ref([])
const props = defineProps(["source"]);
onBeforeMount(() => {
  const list = listDuplicate();
  kwList.value = [...new Set(list)];
})

function listDuplicate(){
for (let com of props.source.data.commentaires) {
  for (let kw of com.keywords_id)
  {kwList.value.push(kw.keywords_id.titre) }
} 
return kwList.value
}

// const config = useRuntimeConfig();
// const directus = new Directus(config.public.API_BASE_URL);
// const listItems = ref([]);
// async function retrieveKeywords() {
//   const publicData = await directus.items("keywords").readByQuery();
//   var L = publicData.data;
//   listItems.value = L;
// }
// retrieveKeywords();

function updateRoute(id) {
  navStore.selectedKeywordID = id;
}
</script>
