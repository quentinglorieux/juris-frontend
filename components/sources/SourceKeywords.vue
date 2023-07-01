<template>

<div class="flex" v-if="source.data.commentaires[0]">
<!-- {{ source.data.commentaires[0].keywords_id }} -->
  <NuxtLink class="link"
      v-for="kw in  source.data.commentaires[0].keywords_id"
      to="/keywords"
      @click="navStore.selectedKeywordID =  kw.keywords_id.id"
      >{{ kw.keywords_id.titre }}</NuxtLink
    >
</div>
  <!-- <div class="flex">
    <NuxtLink class="link"
      v-for="kw in kwList"
      to="/keywords"
      @click="navStore.selectedKeywordID = kw.id"
      >{{ kw.titre }}</NuxtLink
    >


  </div> -->
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
const navStore = useNavStore();
const props = defineProps(["source"]);

// // import { Directus } from "@directus/sdk";
// const kwList = ref([]);

// onBeforeMount(() => {
//   const list = listDuplicate();
//   kwList.value = [...new Set(list)];
// });

// function listDuplicate() {
//   for (let com of props.source.data.commentaires) {
//     for (let kw of com.keywords_id) {
//       kwList.value.push({ titre: kw.keywords_id.titre, id: kw.keywords_id.id });
//     }
//   }
//   return kwList.value;
// }


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