<template>
    <div class="flex"> 
    <NavSource class="" @sourceSelected = "(e) => sourceSelection = e"/> 
    <MainSource class="" :source = sourceSelection />
    <SourceCommentsCol :selectedCom="a" />
    </div>
</template>

<script setup>
const sourceSelection = ref('')
</script>