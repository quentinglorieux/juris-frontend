<template>
  <div class="flex">
    <NuxtLink class="link"
      v-for="kw in kwList"
      to="/keywords"
      @click="navStore.selectedKeywordID = kw.id"
      >{{ kw.titre }}</NuxtLink
    >
    <!-- <Tag
      v-for="kw in kwList"
      class="mr-2 text-sm"
      severity="info"
      icon="pi pi-link"
      :value="kw.titre"
    >
    </Tag> -->

  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();

// import { Directus } from "@directus/sdk";
const kwList = ref([]);
const props = defineProps(["source"]);
onBeforeMount(() => {
  const list = listDuplicate();
  kwList.value = [...new Set(list)];
});

function listDuplicate() {
  for (let com of props.source.data.commentaires) {
    for (let kw of com.keywords_id) {
      kwList.value.push({ titre: kw.keywords_id.titre, id: kw.keywords_id.id });
    }
  }
  return kwList.value;
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
</script>

<style scoped>



.link {
	color: #18272F;
  position: relative;
  text-decoration: none;
  margin-right: 10px;
}

.link::before {
  content: '';
  position: absolute;
  width:100%;
  height: 1px;
  border-radius: 1px;
  background-color: #18272F;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform .3s ease-in-out;
}

.link:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}
</style>