<script setup>

const visible = ref(false);

const onConfigButtonClick = () => {
    visible.value = !visible.value;
};

</script>

<template>
    <button class="layout-config-button p-link" type="button" @click="onConfigButtonClick()">
        <i class="pi pi-chevron-circle-left"></i>
    </button>

    <Sidebar v-model:visible="visible" position="right" :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'" class="layout-config-sidebar w-20rem">
      Menu de droite
    </Sidebar>
    
</template>

<style lang="scss" scoped></style>
