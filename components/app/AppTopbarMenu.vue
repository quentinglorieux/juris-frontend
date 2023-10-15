
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
  { label: "ACCUEIL", icon: "pi pi-fw pi-home", to: "/" },
  { label: "SOURCES", icon: "pi pi-fw pi-th-large", to: "/sources" },
  { label: "MOTS-CLÉS", icon: "pi pi-fw pi-tags", to: "/keywords" },
  { label: "THÈMES", icon: "pi pi-fw pi-list", items: [] },
  { label: "AUTEURS", icon: "pi pi-fw pi-users", items: [] }, // change the item.value[5] if remove Alt
  { label: "MAP", icon: "pi pi-fw pi-share-alt", to: "/map" },
]);


</script>