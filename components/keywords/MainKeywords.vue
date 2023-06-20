<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
  <!-- {{ navStore.selectedKeywordID }} -->
    <div v-if="!kw">
      <h1>Sélectionnez un Mot-clé</h1>
    </div>
    <div v-else class="ml-2">
      <h1>{{ kw.titre }}</h1>
    
      
      <li v-for="com in kw.commentaires">
        <div>
          <ul class="mr-3">
            {{
              com.commentaires_id.titre
            }}
            <span v-if="com.commentaires_id.auteur_id">
              by
              <span class="font-semibold hover:bg-sky-200">
                <NuxtLink :to="`/auteur-${com.commentaires_id.auteur_id.last_name}`"
                  >{{ com.commentaires_id.auteur_id.first_name }}
                  {{ com.commentaires_id.auteur_id.last_name }}
                </NuxtLink></span
              ></span
            >
            <Button class="mt-1 mx-1" @click="onCommentButtonClick(com)"> Lire </Button>
          </ul>
        </div>
      </li>
    </div>
  </div>

  <Sidebar
    v-model:visible="visible"
    position="right"
    :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
    class="layout-comment-sidebar bg-gray-100 min-w-fit"
  >
    <h3>{{ selectedCom.titre }}</h3>
    {{ selectedCom.id }}
    {{ selectedCom.id }}
    {{ selectedCom.content }}
  </Sidebar>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();
const props = defineProps(["sourceID"]);
const selectedCom = ref("");
const visible = ref(false);
const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com.commentaires_id;
};
const kw = ref(false);
onUpdated(() => {
    kw.value = store.keywords.find((element) => element.id == navStore.selectedKeywordID);
});
onMounted(()=>{
  try {
  kw.value = store.keywords.find((element) => element.id == navStore.selectedKeywordID);
  }
  catch(error){
    console.log(error)
  }
})
</script>

<style scoped>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
  width: 50%;
}
.p-sidebar {
  width: 40rem;
}

Button {
  background-color: #0289d1f9;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.2rem 0.3rem;
  border-radius: 3px;
  margin-left: 2px;
  margin-top: 2px;
}
</style>