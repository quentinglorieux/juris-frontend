<template>
  <div class="pl-4">
    <Splitter class="mb-5" style="background-color: rgb(226 232 240); border: none">
      <SplitterPanel :size="75" class="">

        <li v-for="com in source.data.commentaires">
          <div class="flex">
            <ul class="mr-3 text-lg">
              {{
                com.titre
              }}
            </ul>
            <Button @click="onCommentButtonClick(com)"> Read </Button>
           
          </div>
        </li>
      </SplitterPanel>
      <SplitterPanel :size="25" v-if="comIsSelected">
        <div>
          {{ selectedCom.id}}
        </div>
      </SplitterPanel>
    </Splitter>
  </div>

</template>

<script setup>
const props = defineProps(["source"]);

const comIsSelected=ref(false)
const selectedCom = ref("");

const onCommentButtonClick = (com) => {
  if (selectedCom.value==com){
    selectedCom.value = '';
    comIsSelected.value=false
  }
  else{
    selectedCom.value = com;
    comIsSelected.value=true;
  }
};


</script>

<style scoped>
Button {
  background-color: #0288d1;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
  z-index: 0;
}
</style>
