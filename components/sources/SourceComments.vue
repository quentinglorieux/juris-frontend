<template>
  <div >
    <li v-for="com in source.data.commentaires">
      <div class="flex" style="align-items:center">
        <Button icon="pi pi-eye" text rounded  @click="togleCommentPanel(com)"/>
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
const navStore = useNavStore();

function togleCommentPanel(com) {
  emit("ComSelected", com);
  if (navStore.comID == com.id) {
    navStore.comID = "";
  } else {
    console.log("sfddfs");
    navStore.comID = com.id;
    navStore.closeNav();
  }
}
</script>


