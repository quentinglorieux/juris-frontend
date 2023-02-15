<template>
    <li v-for="com in sourceNode.comments">
      <div class="flex">
        <ul class="mx-4">
          {{
            com.title
          }}
        </ul>
        <Button @click="onCommentButtonClick(com)"> Read </Button>
      </div>
    </li>

    <Sidebar
      v-model:visible="visible"
      position="right"
      :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
      class="layout-comment-sidebar"
    >
      <h3>{{ selectedCom.title }} </h3>
      {{ selectedCom.content }}
    </Sidebar>



</template>

<script setup>
const props = defineProps(["sourceNode"]);

const selectedCom = ref("");
const visible = ref(false);
const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com;
};


</script>

<style scoped>
Button {
    background-color:  #0288D1;
    font-size: 0.85rem ;
    font-weight: 600;
    padding: 0.25rem 0.4rem;
    border-radius: 3px;
}
</style>