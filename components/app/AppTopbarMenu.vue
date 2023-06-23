
<template>
    <div>
        <Menubar :model="items">
            <template #start>
                <h3>JURISITE</h3>
                
            </template>

        </Menubar>
    </div>
</template>

<script setup>
import { ref } from "vue";


const items = ref([
     { label: "Accueil", icon: "pi pi-fw pi-home", to: "/" },
      { label: "Sources", icon: "pi pi-fw pi-file", to: "/sources" },
      { label: "Thèmes", icon: "pi pi-fw pi-list", to: "/themes" },
      { label: "Mots Clés", icon: "pi pi-fw pi-tags", to: "/keywords" },
      { label: "Auteurs", icon: "pi pi-fw pi-user", to: "/autors" },

]);


</script>