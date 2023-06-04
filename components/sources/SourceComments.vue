<template>
  <div class="pl-4">
    <li v-for="com in source.data.commentaires">
      <div class="flex">
        <ul class="mr-3 text-lg">
          {{
            com.titre
          }}
        </ul>

        <Button v-if="comSelected == com.id" @click="togleCommentPanel(com)">
          Close
        </Button>
        <Button v-else @click="togleCommentPanel(com)"> Read </Button>
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
