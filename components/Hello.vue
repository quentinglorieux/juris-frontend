<template>
    <div class="bg-slate-50 py-4">

        <h1 class="bg-slate-400 py-10 text-6xl text-center"> Home of Juris Lab </h1>


<div class="flex space-x-2">
        <Card style="width: 25em">
            <template #header>
                <img src="@/assets/images/card.jpg" style="height: 15rem" />
            </template>
            <template #title>
                US Constitution
            </template>
            <template #subtitle>
                Section 1
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Read" />
            </template>
        </Card>
        <Card style="width: 25em">
            <template #header>
                <img src="@/assets/images/card.jpg" style="height: 15rem" />
            </template>
            <template #title>
                US Constitution
            </template>
            <template #subtitle>
                Section 2, Clause 1
            </template>
            <template #content>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!</p>
            </template>
            <template #footer>
                <Button icon="pi pi-check" label="Read" />
               
            </template>
        </Card>

    </div>

    </div>
</template>

<script setup>

import { ref } from 'vue';
const visibleLeft = ref(false);

</script>