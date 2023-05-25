<template>
  <div class="pl-4"> 
    <li v-for="com in source.data.commentaires">
      <div class="flex">
        <ul class="mr-3 text-lg">
          {{
            com.titre
          }}
        </ul>
        <Button @click="onCommentButtonClick(com)"> Read </Button>
        <Button @click="emit('ComSelected',com)"> EMit </Button>
      </div>
    </li>
  </div>

  selectedCom.id : {{  selectedCom.id }}
    <!-- <Sidebar
      v-model:visible="visible"
      position="right"
      :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
      class="layout-comment-sidebar"
    >
      <h3>{{ selectedCom.titre }} </h3>
      {{ selectedCom.id }}
      {{ selectedCom.content }}
    </Sidebar> -->



</template>

<script setup>
const props = defineProps(["source"]);


const selectedCom = ref("");
const visible = ref(false);
const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com;
};

const emit = defineEmits(['ComSelected']);


</script>

<style scoped>
Button {
    background-color:  #0288D1;
    font-size: 0.85rem ;
    font-weight: 600;
    padding: 0.25rem 0.4rem;
    border-radius: 3px;
    z-index: 0;
}
</style>