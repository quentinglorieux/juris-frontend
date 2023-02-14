<template>
    
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!sourceNode"> 
        <h1>Sélectionnez une Source </h1>
        (par exemple Article 1 - Section 1)
     </div>   
    <div v-if="sourceNode"> 
    <div  class="">
      <h1>Source : {{ sourceNode.label }}</h1>
      <h2>Texte</h2>
      <p v-if="sourceNode.text">“{{ sourceNode.text }}”</p>
    </div>

    <h2>Mots Clés</h2>
    <!-- <SourceKeywords />  -->
    <div class="flex">
      <Tag
        v-for="kw in sourceNode.keywords"
        class="mr-2 text-sm"
        severity="info"
        :value="kw"
      ></Tag>
    </div>

    <h2>Commentaires</h2>
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

    <h2>Thèmes</h2>
  </div>

</div>
</template>

<script setup>
import textJson from "~/assets/data/sourcetext.json";

const props = defineProps(["sourceNode"]);
const found = ref("");

const nodes = ref(null);

const selectedCom = ref("");

watch(
  () => props.sourceNode.key,
  (newKey) => {
    found.value = getTextByKey(newKey);
    // console.log(newKey)
    // console.log(found.value)
  }
);

onMounted(() => {
  nodes.value = textJson.root;
});

function getTextByKey(key) {
  return nodes.value.filter(function (data) {
    console.log(data.key);
    // console.log(key)
    return data.key == key;
  });
}

const visible = ref(false);
const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com;
};
</script>

<style>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
    min-width: 600px !important;
}

</style>
