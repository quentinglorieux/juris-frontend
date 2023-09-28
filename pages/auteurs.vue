<template>
    
    <div class="w-3/4 mx-auto  mt-1"> 
      <div class="titre-page">
      <h1>Les auteurs </h1>
    </div>
        <!-- <h2 class="mb-0">  </h2> -->
  <DataTable :value="store.authors" tableStyle="min-width: 50rem">
    <Column field="name" header="">
      <template #body="slotProps" >
        <div class="flex font-bold items-center"> 
        <Avatar :image="'https://jurisdirectus.rubidiumweb.eu/assets/' + slotProps.data.avatar + '?fit=cover&width=200&height=200&quality=10'" class="mr-2" size="large" shape="circle" />
 <div> {{ slotProps.data.first_name + " " + slotProps.data.last_name }}</div>
</div>
      </template>
    </Column>

 
    <Column field="comments" header="">
      <template #body="SlotCom">
        <div  class="flex justify-center">
          <NuxtLink :to="'auteur-' + SlotCom.data.last_name"> <Button
            class="mt-1 mx-1"
            label="Voir les commentaires" 
          /></NuxtLink>
        </div>
      </template>
    </Column>
  </DataTable>
</div>
</template>

<script setup>
import { useGlobalStore } from "~/stores/global";
const store = useGlobalStore();

const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com;
};
</script>
