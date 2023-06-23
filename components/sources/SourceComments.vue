<template>
  <div >
    <li v-for="com in source.data.commentaires">
      <div class="flex" style="align-items:start">
        <Button icon="pi pi-eye" text rounded  @click="retrieveComments(com)"/>
        <ul class="mr-3 text-lg" >
          {{com.titre}}
        </ul>

        <!--<Button v-if="comSelected == com.id" @click="togleCommentPanel(com)">
          Close
        </Button>-->

      </div>
    </li>
  </div>
</template>

<script setup>
const props = defineProps(["source", "comSelected"]);
const emit = defineEmits(["ComSelected"]);
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";
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


