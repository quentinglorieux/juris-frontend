<template>
  <div class="flex flex-column p-1 w-full">
    <!-- {{ navStore.selectedKeywordID }} -->
    <div v-if="!kw">
      <h1>Sélectionnez un Mot-clé</h1>
    </div>
    <div v-else>
      <div class="titre-page">
      <h1>{{kw.titre}}</h1>
      </div>
          
      <div class="flex flex-column p-1 w-full" style="text-align:left;">
        <table ><!--à modifier en DataTable afin d'avoir le trie-->
          <tr>
            <th style="width:20%"> Source</th>
            <th style="width:50%">Titre du commentaire</th>
            <th style="width:20%">Auteur</th>
            <th style="width:10%">   </th>
          </tr>
          <tr v-for="com in kw.commentaires">
            <td> {{
              com.commentaires_id.source
            }} </td>
            <td> {{
              com.commentaires_id.titre
            }}</td>
            <td>
              <span v-if="com.commentaires_id.auteur_id">
              
              <span class="font-semibold hover:bg-sky-200">
                <NuxtLink
                  :to="`/auteur-${com.commentaires_id.auteur_id.last_name}`"
                  >{{ com.commentaires_id.auteur_id.first_name }}
                  {{ com.commentaires_id.auteur_id.last_name }}
                </NuxtLink></span
              ></span
            >
            </td>
            <td>
              <Button class="mt-1 mx-1" @click="onCommentButtonClick(com)">
              Lire
            </Button>
            </td>
          </tr>
        </table>
    
      
      </div>
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
  kw.value = store.keywords.find(
    (element) => element.id == navStore.selectedKeywordID
  );
});
onMounted(() => {
  try {
    kw.value = store.keywords.find(
      (element) => element.id == navStore.selectedKeywordID
    );
  } catch (error) {
    console.log(error);
  }
});
</script>


