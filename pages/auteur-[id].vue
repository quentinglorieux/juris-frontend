<template>
  <div v-if="!author"> 
    Chargement en cours
  </div>
  <div class="w-3/4 mx-auto mt-1" v-else>
    <div class="titre-page">
      <h1>{{ author.first_name + ' ' + author.last_name  }} </h1>
    </div>

    <Panel class="px-2 mt-2" header="Biographie" toggleable :collapsed="true">
          <div>{{ author.short_cv }}</div>
        </Panel>

        <div class="py-2 px-2" style="text-align: left">
          <DataTable
            showGridlines
            scrollable
            :value="listItems"
            tableStyle="min-width: 50rem"
            :class="`p-datatable-sm`"
          >
            
            <Column
              sortable
              field="titre"
              header="Commentaires"
            ></Column>

            <Column
              sortable
              field="source_id.titre"
              header="Sources"
            ></Column>

            <Column field="id" header="">
              <template #body="SlotCom">
                <div class="flex justify-center">
                  <Button
                    class="mt-1 mx-1"
                    @click="
                      onCommentButtonClick(SlotCom.data.id)
                    "
                  >
                    Lire 
                  </Button>
                </div>
              </template>
            </Column>
      
            
          </DataTable>
        </div>

        <Sidebar
      v-model:visible="visible"
      position="right"
      :transitionOptions="'.3s cubic-bezier(0, 0, 0.2, 1)'"
      class="layout-comment-sidebar bg-gray-50 w-fit"
    >
      <CommentaireSide :com="selectedCom"> </CommentaireSide>
    </Sidebar>
    
  </div>
</template>

<script setup>
// import { Directus } from "@directus/sdk";
import { useGlobalStore } from "~/stores/global";
const route = useRoute();
const store = useGlobalStore();

const listItems = ref([]);
const author = ref();
const visible = ref(false);
const selectedCom = ref("");

// DataFetching of Commentaires
const { $directus } = useNuxtApp();
async function retrieveComments() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("commentaires").readByQuery({
      fields: ["id,titre,source_id.titre"],
      filter: {
        auteur_id: {
          last_name: {
            _eq: route.params.id,
          },
        },
      },
    });
  });
  var L = publicData.value.data;
  listItems.value = L;
}

async function retrieveAuthor() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("directus_users").readByQuery({
      fields: ["id,first_name,last_name,first_name,short_cv"],
      filter: {
        last_name: {
          _eq: route.params.id,
        },
      },
    });
  });
  console.log(publicData);
  var L = publicData.value.data;
  author.value = L[0];
}

const onCommentButtonClick = (com) => {
  visible.value = !visible.value;
  selectedCom.value = com;
};

onMounted(() => {
  retrieveComments();
  retrieveAuthor();
  // retrieveAuthors();
});

watch(route, (newX) => {
  // retrieveComments();
});
</script>
