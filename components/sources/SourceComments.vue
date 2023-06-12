<template>
  <div class="pl-4">
    <li v-for="com in source.data.commentaires">
      <div class="flex">
        <ul class="mr-3 text-lg">
          {{ com.titre }}

        </ul>

        <Button v-if="store.commentaires.id == com.id & navStore.comVisibility " @click="CloseCommentPanel(com)">
          Fermer
        </Button>
        <Button v-else @click="retrieveComments(com)"> Lire </Button>
      </div>
    </li>
  </div>
</template>

<script setup>
const props = defineProps(["source", "comSelected"]);
const emit = defineEmits(["ComSelected"]);
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();

function CloseCommentPanel(com){
  navStore.comVisibility = false;
  // navStore.comID ='';
  store.commentaires={}
}

const { $directus } = useNuxtApp();
async function retrieveComments(com) {
  const id=com.id
  const { data } = await useAsyncData(() => {
    return $directus.items("commentaires").readOne(id);
  });

  store.commentaires=data.value;
  navStore.comVisibility=true;
  navStore.navVisibility=false;
  navStore.comID = com.id;
}

</script>

<style scoped>
Button {
  background-color: #0288d1;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
  z-index: 0;
}
a {
  margin-right: 10px;
}
</style>
