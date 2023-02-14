<template>
    <div class="flex"> 
    <NavSource  @sourceSelected="(e) => source=e"/> 
    <MainSource :source=source />
    <SingleSource />
    </div>
</template>

<script setup>
const source = ref('')
</script>