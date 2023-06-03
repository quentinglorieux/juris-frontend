<template>
  <div class="flex">
    <NavSource
      @closeNavSource="() => (isNavSourceVisible = false)"
      @sourceSelected="(e) => (sourceSelection = e)"
      v-model:visible="isNavSourceVisible"
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
const props = defineProps(["visible", "other"]);

function navSourceVisibility(e) {
  console.log(e)
  if (e == "") {
    isNavSourceVisible.value = true;
  } else {
    isNavSourceVisible.value = false;
  }
}

function test(e) {
  isNavSourceVisible = !isNavSourceVisible;
}
</script>

<style scoped lang="scss">
.slayout-navbar {
  transform: translateX(-100px);
}
.slayin-navbar {
  transform: translateX(0%);
  transition-duration: 200ms;
}
</style>
