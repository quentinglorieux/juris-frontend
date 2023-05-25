
<template>
        <Menubar :model="items" />
</template>



<script setup>
const items = ref([
    {
        label: 'Source',
        to:{hash: '#main-source'},
       
    },
    {
        label: 'Mots clés',
        to:{hash: '#keywords'}
    },
    {
        label: 'Commentaires',
        to:{hash: '#comments'}
    },
    {
        label: 'Themes',
        to:{hash: '#themes'}
    },
]);
</script>

