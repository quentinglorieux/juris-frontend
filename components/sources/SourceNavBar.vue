
<template>
        <Menubar :model="items" />
</template>



<script setup>
const items = ref([
        {
        label: 'Commentaires',
        to:{hash: '#keywords'}
    },

    {
        label: 'Mots clés',
        to:{hash: '#keywords'}
    },

    {
        label: 'Themes',
        to:{hash: '#themes'}
    },
]);
</script>

