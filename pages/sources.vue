<template>
  <div class="flex">
   <div :style=" isNavSourceVisible ?  'width:350px' : 'width:0px' ">
    <NavSource 
      v-if="isNavSourceVisible"
      class=""
      @closeNavSource="() => (isNavSourceVisible = false)"
      @sourceSelected="(e) => (sourceSelection = e)"
    />
  </div>
    <NavSourceMinified
      v-if="isNavSourceVisible == false"
      @openNavSource="() => (isNavSourceVisible = true)"
    />
    <!-- <MainSource
      class=""
      :source="sourceSelection"
      @com-is-selected="(e) => navSourceVisibility(e)"
    /> -->
    <MainSourceEditorJS />
  </div>
</template>

<script setup>
const sourceSelection = ref("");
const isNavSourceVisible = ref(true);

const width=ref('0');


function navSourceVisibility(e) {
  if (e == "") {
    isNavSourceVisible.value = true;
  } else {
    isNavSourceVisible.value = false;
  }
}
</script>

<style scoped lang="scss"></style>
