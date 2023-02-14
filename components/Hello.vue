<template>
    <div class="bg-slate-50">

        <h1 class="bg-slate-400 py-10 text-6xl text-center"> Hello </h1>


<div class="flex space-x-2">
        <Card style="width: 25em">
            <template #header>
                <img src="@/assets/images/card.jpg" style="height: 15rem" />
            </template>
            <template #title>
                Advanced Card
            </template>
            <template #subtitle>
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>
        <Card style="width: 25em">
            <template #header>
                <img src="@/assets/images/card.jpg" style="height: 15rem" />
            </template>
            <template #title>
                Advanced Card
            </template>
            <template #subtitle>
                Card subtitle
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Save" />
                <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" />
            </template>
        </Card>

    </div>

    <Button label="Submit"> </Button>
    <div>  <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i></div>
  

    <Button icon="pi pi-arrow-right" @click="visibleLeft = true" class="mr-2" />
    <Sidebar v-model:visible="visibleLeft" :baseZIndex="10000">
            <h3>Left Sidebar</h3>
        </Sidebar>

    </div>
</template>

<script setup>

import { ref } from 'vue';
const visibleLeft = ref(false);

</script>