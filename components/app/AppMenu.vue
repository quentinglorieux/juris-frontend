<script setup>

const model = ref([
    {
        label: 'Accueil',
        items: [{ label: 'Accueil', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Entrées',
        items: [
            { label: 'Sources', icon: 'pi pi-fw pi-file', to: '/sources' },
            // { label: 'Commentaires', icon: 'pi pi-fw pi-comment', to: '/commentaires' },
            { label: 'Thèmes', icon: 'pi pi-fw pi-list', to: '/themes' },
            { label: 'Mots Clés', icon: 'pi pi-fw pi-tags', to: '/keywords' },
            { label: 'Auteurs', 
            icon: 'pi pi-fw pi-user', 
            items: [
                            { label: 'Auteur 1', icon: 'pi pi-fw pi-bookmark' , to: '/auteur1'},
                            { label: 'Auteur 2', icon: 'pi pi-fw pi-bookmark' , to: '/auteur2'},
                            { label: 'Auteur 3', icon: 'pi pi-fw pi-bookmark' , to: '/auteur3'}
                        ] },   
            
           
        ]
    },
    {
        label: 'Visualisation',
        items: [
            { label: 'Map', icon: 'pi pi-fw pi-share-alt', to: '/map' },
        ]
    },
    
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
