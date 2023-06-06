<template>
  A
  <h3>{{ selectedCom }}</h3>
  {{ selectedCom.id }}
  {{ selectedCom.content }}
  <!-- {{ selectedCom.keywords_id.keywords_id.titre }} -->
</template>

<script setup>
const props = defineProps(["selectedCom"]);

const selectedCom = ref("");
</script>

<style scoped></style>
