<template>
    <div class="flex"> 
    <NavSource2 class="" @sourceSelected = "(e) => sourceSelection = e"/> 
    <MainSource class="" :source = sourceSelection />
    </div>
</template>

<script setup>
const sourceSelection = ref('')
</script>