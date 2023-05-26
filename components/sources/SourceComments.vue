<template>
  <div class="pl-4">
    <li v-for="com in source.data.commentaires">
      <div class="flex">
        <ul class="mr-3 text-lg">
          {{
            com.titre
          }}
        </ul>
        <Button v-if="selectedCom == com" @click="togleCommentPanel(com)"> Close </Button>
        <Button v-else @click="togleCommentPanel(com)"> Read </Button>
      </div>
    </li>
  </div>
</template>

<script setup>
const props = defineProps(["source"]);
const emit = defineEmits(["ComSelected"]);
const selectedCom = ref("");
function togleCommentPanel(com) {
  emit("ComSelected", com);
  if (selectedCom.value == com) {
    selectedCom.value = "";
  } else {
    selectedCom.value = com;
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
</style>
