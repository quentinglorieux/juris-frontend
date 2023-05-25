<template>
    <div class="flex"> 
    <NavSource class="" @sourceSelected = "(e) => sourceSelection = e"/> 
    <MainSource class="" :source = sourceSelection />
    Heuy
    <SourceCommentsCol :selectedCom="a" />
    </div>
</template>

<script setup>
const sourceSelection = ref('')
</script>