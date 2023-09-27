<template>
  <div class="flex flex-wrap">

 
      <NuxtLink
        class="link"
        v-for="kw in kwList"
        to="/keywords"
        @click="navStore.selectedKeywordID = kw.id"
      >
      <!-- {{ kw.titre }} -->

      <div class="bg-slate-300 rounded-full flex flex-wrap gap-2">
        <Chip class="pl-0 pr-3 flex">
          <span
            class="bg-primary border-circle w-2rem h-2rem flex align-items-center justify-content-center"
            > {{ kw.titre[0] }}</span
          >
          <span class="ml-2 font-medium">{{ kw.titre }}</span>
        </Chip>
      </div>

      </NuxtLink>
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
</script>

<style scoped>
.link {
  color: #18272f;
  position: relative;
  text-decoration: none;
  padding: 10px;
}

.link::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  border-radius: 1px;
  background-color: #18272f;
  bottom: 0;
  left: 0;
  transform-origin: right;
  transform: scaleX(0);
  transition: transform 0.3s ease-in-out;
}

.link:hover::before {
  transform-origin: left;
  transform: scaleX(1);
}
</style>
