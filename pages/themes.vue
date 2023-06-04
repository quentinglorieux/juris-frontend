<template>
  <div class="flex">
    <NavThemes  @themeSelected="(e) => (themeSelection = e)" />
    <MainThemes :theme="themeSelection"/>
  </div>
</template>

<script setup>
const themeSelection = ref("");



</script>

<style scoped lang="scss">

</style>
