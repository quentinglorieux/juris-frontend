<template>
  <div class="flex flex-column p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <Splitter>
        <SplitterPanel :size="40">
          <ScrollPanel>
            <div id="main-source"></div>
            <div class="p-3" v-for="block in editorJScontent">
              <div v-html="block"></div>
            </div>
            <ScrollTop
              target="parent"
              :threshold="100"
              class="custom-scrolltop"
              icon="pi pi-arrow-up"
            />
          </ScrollPanel>
        </SplitterPanel>

        <SplitterPanel :size="60" >
          <div class="titre-page">
            <h1>{{ source.data.titre }}</h1>
            <h3 v-if="source.data">[{{ source.data.type }}]</h3>
          </div>
          <div class="split-menu">
            <div>
              <TabView>
                <TabPanel header="Commentaires">
                  <SourceComments
                    :source="source"
                    :comSelected="comActiv"
                    @ComSelected="openWindowForComment"
                  />
                </TabPanel>
                <TabPanel header="Mots Clefs">
                  <SourceKeywords :source="source" />
                </TabPanel>
                <TabPanel header="Thèmes">
                  <SourceThemes :source="source" />
                </TabPanel>
                <TabPanel header="Traduction(s)">
                  <h2>traduction(s?)</h2>
                </TabPanel>
              </TabView>
            </div>

            <div class="source-commentaire" v-if="navStore.comVisibility">
              
                <div class="close-button">
                  <Button
                    icon="pi pi-times"
                    text
                    rounded
                    @click="navStore.comVisibility = false"
                  >
                  </Button>
                </div>
                <TabView>
                  <TabPanel >
                    <template #header>
                      <span><i class="pi pi-file-edit"></i>  Commentaire actif {{ comActiv }}</span>
                    </template>
                    <ScrollPanel style=" margin:-1rem; height:100%; background-color:white;">
                      <p class="p-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Integer in rutrum magna. Curabitur quis fermentum eros,
                        id dictum dui. Sed porttitor mi eu lectus vehicula
                        placerat. Phasellus dapibus metus nec lorem aliquet
                        dictum. Mauris efficitur sodales venenatis. Aliquam
                        iaculis a odio quis facilisis. Curabitur porttitor eros
                        et finibus mattis. Ut sagittis vitae ex quis
                        condimentum. Vivamus malesuada vitae lorem feugiat
                        rhoncus. Sed at pulvinar dui, nec blandit leo. Curabitur
                        ut mauris et neque porttitor fringilla et eu odio.
                        Integer at ultricies lacus. Ut facilisis, magna a
                        aliquet tincidunt, dolor turpis maximus odio, quis
                        pulvinar sem lacus non dolor. Nulla mi lacus, maximus
                        molestie vehicula id, varius sed ipsum. Cras molestie
                        nunc a elit dignissim venenatis. Sed hendrerit sem nec
                        turpis dapibus feugiat. In aliquet varius diam ac
                        feugiat. Phasellus eu nunc neque. Etiam at efficitur
                        lectus, ut viverra nisl. Sed facilisis libero vitae
                        nulla pulvinar, eu vulputate orci bibendum. Morbi risus
                        enim, dapibus vitae nibh eu, porta elementum tellus.
                        Etiam in massa ac erat maximus feugiat quis sit amet
                        nibh. Morbi sit amet aliquam erat, vel pulvinar risus.
                        Fusce at erat maximus, placerat sapien pellentesque,
                        facilisis tortor. Nunc rutrum velit odio, at fermentum
                        mi eleifend scelerisque. Nunc facilisis nec neque et
                        lobortis. Aenean ipsum magna, tempus vitae tellus sed,
                        accumsan vestibulum nunc. Maecenas ultrices imperdiet
                        mauris at maximus. Vivamus ullamcorper nisi ut malesuada
                        aliquam. Nulla imperdiet libero vel metus fringilla
                        rutrum. In vulputate sem faucibus sapien elementum
                        pellentesque. Proin dignissim mauris at est pulvinar
                        venenatis. Suspendisse vulputate nisl elit, ut ornare
                        nunc pellentesque ut. Curabitur vel hendrerit justo, ac
                        porta ante. Donec ligula odio, lacinia id turpis ac,
                        euismod fringilla quam. Nam eget nisl in odio dignissim
                        dignissim. Sed quis mattis neque, consequat aliquet leo.
                        Sed enim augue, volutpat sit amet ultricies id, sodales
                        non diam. Aliquam blandit mattis massa. Integer suscipit
                        tempus dui ac vestibulum. Aliquam ac justo in eros
                        venenatis efficitur. Suspendisse sed euismod odio.
                        Vivamus sit amet felis sagittis, rutrum metus eget,
                        mattis libero. Cras scelerisque aliquam leo, at rhoncus
                        risus fringilla quis. Nunc at risus nec mi condimentum
                        finibus. Duis massa tortor, eleifend et libero eu,
                        pretium volutpat ante. Aenean laoreet urna eget augue
                        aliquet euismod. Pellentesque fringilla faucibus ligula,
                        ac laoreet magna blandit in. Fusce placerat et orci sit
                        amet gravida. Proin rutrum aliquam ligula non faucibus.
                        Suspendisse mollis facilisis ex in varius. Curabitur
                        sapien mauris, tristique et lectus vel, consectetur
                        placerat orci. Donec fringilla ut arcu non dignissim.
                        Aliquam eleifend iaculis congue. Sed et fermentum est.
                        Etiam mollis nibh in pretium commodo. Nulla congue
                        finibus turpis quis lacinia. Mauris at elit in tellus
                        auctor scelerisque non nec velit. Praesent consectetur
                        tempus neque, ac convallis lorem congue ac. Vestibulum
                        sagittis convallis hendrerit. In tortor metus, luctus in
                        scelerisque sit amet, porta sit amet lectus. Sed mattis
                        tempor erat at convallis. Aliquam mi sapien, interdum at
                        feugiat at, molestie at nisi. Pellentesque luctus tempus
                        metus, vel aliquam orci. Nullam sit amet rutrum augue.
                        Nulla finibus condimentum est eu blandit. Vestibulum a
                        placerat dolor, ultrices aliquet turpis. Sed ut rhoncus
                        risus, a pretium felis. Maecenas lectus est, fermentum
                        sed augue a, ornare porta est. Phasellus suscipit ornare
                        pretium. Nulla a feugiat leo. Aenean mi nisl, dignissim
                        a imperdiet sit amet, tristique et dui. Vestibulum in
                        felis nec turpis accumsan egestas. Mauris ornare quis
                        odio eu fermentum. Vestibulum eget porttitor diam.
                        Vestibulum nec suscipit enim, sed consectetur est. Fusce
                        ac turpis ac leo ultricies commodo. Donec maximus enim
                        non dolor porta, quis efficitur leo efficitur. Sed ut
                        tincidunt magna, quis sagittis sapien. Praesent
                        venenatis, risus vel interdum tincidunt, felis orci
                        fringilla est, consectetur maximus tortor nunc sed odio.
                        Quisque accumsan sapien ac magna mattis tincidunt. Ut
                        tristique pellentesque augue, at placerat leo convallis
                        eleifend. Fusce iaculis sapien varius, condimentum
                        tortor sed, mollis lacus. Nullam hendrerit dolor eget
                        risus euismod, ac suscipit tortor viverra. Nullam
                        tincidunt tortor sit amet nisl venenatis consequat. In
                        fringilla massa nec dictum pharetra. Sed sit amet
                        lobortis metus. Sed scelerisque accumsan pulvinar. Duis
                        tristique lorem a sapien convallis, id ultrices nisl
                        porttitor. Praesent a tortor eget turpis molestie
                        porttitor. Nunc ac justo leo. Fusce sit amet velit ut
                        enim accumsan venenatis. Aenean elementum ante a
                        placerat pretium. Phasellus iaculis nulla id orci
                        efficitur, et efficitur orci sodales. Nam sit amet
                        facilisis mi, vel tempor sapien. Sed vulputate est sit
                        amet augue dapibus convallis. Vestibulum pellentesque,
                        magna id congue vehicula, lacus sem congue sem, vitae
                        consequat justo nibh vel orci. Donec euismod tortor et
                        sem sodales, ac scelerisque arcu venenatis. Maecenas
                        dapibus at purus vel pharetra. Sed consectetur risus et
                        finibus euismod. Proin ultricies finibus sapien, a
                        ullamcorper libero dapibus ac. Cras pellentesque euismod
                        sapien, id tincidunt ipsum. Curabitur et risus ac lacus
                        vulputate malesuada. Curabitur ut quam velit. Integer
                        luctus aliquam sapien nec eleifend. Nam volutpat aliquet
                        odio sed mattis. Morbi semper venenatis justo nec
                        congue. Sed laoreet volutpat justo a accumsan. Maecenas
                        scelerisque, sapien at fermentum sollicitudin, quam nunc
                        rhoncus libero, et consectetur mi justo a nunc. Nulla
                        vel lobortis felis. Cras rhoncus, ante non egestas
                        dapibus, lectus nulla dignissim augue, non molestie quam
                        mi vitae diam. Vivamus sodales accumsan libero, ut
                        imperdiet lectus. Suspendisse nec condimentum nulla.
                        Phasellus hendrerit non nulla quis cursus. Donec blandit
                        eleifend metus, nec rhoncus est malesuada a. Praesent at
                        luctus velit, non mattis ipsum. Aliquam erat volutpat.
                        Nam lacinia pellentesque viverra. Maecenas varius nisl
                        eget lacus interdum, eu ultrices libero pretium. Aliquam
                        sollicitudin, lectus eget pharetra aliquam, ante lectus
                        tincidunt nunc, vitae auctor ligula lorem ac elit. Etiam
                        et gravida dui.
                      </p>
                      <ScrollTop
                        target="parent"
                        :threshold="100"
                        class="custom-scrolltop"
                        icon="pi pi-arrow-up"
                      />
                    </ScrollPanel>
                  </TabPanel>
                  <TabPanel>
                    <template #header>
                      <span>Mots Clefs</span>
                    </template>
                  </TabPanel>
                  <TabPanel>
                    <template #header>
                      <span>Auteurs</span>
                    </template>
                  </TabPanel>
                </TabView>
              
            </div>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from "@/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();

const comActiv = ref();
const sourceIsSelected = ref(false);
const props = defineProps(["sourceID"]);
const source = ref();
const oldID = ref();

const emit = defineEmits(["comIsSelected"]);

import edjsHTML from "editorjs-html";
const edjsParser = edjsHTML();
const editorJScontent = computed(() => {
  return edjsParser.parse(source.value.data.EditorJS);
});

onUpdated(() => {
  if (navStore.selectedSourceID != oldID.value) {
    retrieveSourceData(navStore.selectedSourceID);
  }
  // console.log(store.sources[store.sources.findIndex(x => x.id === navStore.selectedSourceID )].type)
  oldID.value = navStore.selectedSourceID;

  const comments = document.getElementsByTagName("mark");
  for (const el of comments) {
    el.addEventListener("click", () => {
      for (const el2 of comments) {
        var comId = el2.getAttribute("data-linkedcomment");
        if (el.getAttribute("data-linkedcomment") == comId) {
          el2.setAttribute("style", "background-color:var(--surface-a);");
          comActiv.value = comId;
        } else {
          el2.setAttribute("style", "background-color:var(--surface-b);");
        }
      }
      retrieveComments(comActiv.value);
    });
  }
});

// DataFetching of the selected Sources
const { $directus } = useNuxtApp();
async function retrieveSourceData(id) {
  source.value = await useAsyncData(() => {
    return $directus.items("sources").readOne(id, {
      fields: [
        "id,titre,type,meta,EditorJS,commentaires.id,commentaires.titre,commentaires.content,commentaires.keywords_id.keywords_id.titre,theme_id.titre",
      ],
    });
  });
  store.sources[store.sources.findIndex((x) => x.id === id)] =
    source.value.data;
}

async function retrieveComments(id) {
  const { data } = await useAsyncData(() => {
    return $directus.items("commentaires").readOne(id);
  });
  comActiv.value = id;
  emit("comIsSelected", true);
  openWindowForComment(data.value);
}

const openWindowForComment = (com) => {
  if (com == comActiv.value) {
    comActiv.value = "";
    sourceIsSelected.value = false;
    emit("comIsSelected", false);
  } else {
    comActiv.value = com.id;
    sourceIsSelected.value = true;
    emit("comIsSelected", true);
    navStore.comVisibility = true;
  }
};

watch(
  () => source,
  (first, second) => {
    if (second.data) {
      if (first.data.titre != second.data.titre) {
        comActiv.value = "";
        sourceIsSelected.value = false;
        emit("comIsSelected", false);
      }
    }
  }
);
</script>

<style scoped>
.stick {
  position: sticky;
  top: 5rem;
}
</style>
