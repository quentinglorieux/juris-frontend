<template>
    <div class="nav-source bg-teal-100"> 
    Nav Source
    </div>  
</template>

<style scoped>
.nav-source{
    height: calc(100vh - 5rem);
    width: 300px;
}
</style>

<script setup>
const model = ref([
    {
        label: 'Article1',
        items: [
            { label: 'Section1', to: '/' },
            { label: 'Section2', 
            items: [
                { label: 'Clause 1', to: '/clause1'},
                { label: 'Clause 2', to: '/clause2'},
                { label: 'Clause 3', to: '/clause3'}
                        ] },
        ]
    },
    {
        label: 'Article2',
        items: [
            { label: 'Section1', 
            items: [
                { label: 'Clause 1', to: '/clause1'},
                { label: 'Clause 2 et 3', to: '/clause2'}
            ],
            label: 'Section2', 
            items: [
                { label: 'Clause 1', to: '/clause1'},
                { label: 'Clause 2 et 3', to: '/clause2'}
                        ] },
        ]
    },

])


</script>