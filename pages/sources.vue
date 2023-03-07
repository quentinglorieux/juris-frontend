<template>
    <div class="flex"> 
    <NavSource2 class="" @sourceSelected = "(e) => source = e"/> 
    <MainSource class="" :sourceNode = source />
    <!-- <SingleSource class="" /> -->
    </div>
</template>

<script setup>
const source = ref('')
</script>