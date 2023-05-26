<template>
  <div class="flex">
    <NavSource
      v-if="isNavSourceVisible"
      class=""
      @closeNavSource="() => (isNavSourceVisible = false)"
      @sourceSelected="(e) => (sourceSelection = e)"
    />
    <NavSourceMinified
      v-if="isNavSourceVisible == false"
      @openNavSource="() => (isNavSourceVisible = true)"
    />
    <MainSource
      class=""
      :source="sourceSelection"
      @com-is-selected="(e) => navSourceVisibility(e)"
    />
  </div>
</template>

<script setup>
const sourceSelection = ref("");
const isNavSourceVisible = ref(true);

function navSourceVisibility(e) {
  if (e == "") {
    isNavSourceVisible.value = true;
  } else {
    isNavSourceVisible.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
