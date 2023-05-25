<template>
  <div class="flex flex-column bg-slate-200 p-3 w-full">
    <div v-if="!source">
      <h1>Sélectionnez une Source</h1>
    </div>
    <div v-if="source">
      <div class="stick">
        <SourceNavBar />
      </div>
      <div class="section" id="main-source"></div>
      <div class="">
        <h1>Titre : {{ source.data.titre }}</h1>
        <p v-if="source.data">Type : {{ source.data.type }}</p>
        <div v-html="markdownToHtml"></div>
      </div>
      <div class="section" id="keywords"></div>
      <h2 id="keywords">Mots Clés</h2>
      <SourceKeywords :source="source" />

      <div class="section" id="keywords"></div>
      <h2>Mots Clés</h2>
      <SourceKeywords :source="source" />

      <div class="section" id="comments"></div>
      <h2>Commentaires</h2>
      <SourceComments :source="source" @ComSelected="callback1"/>
      {{  selComm }}

      <div class="section" id="themes"></div>
      <h2>Thèmes</h2>
      <SourceThemes :source="source" />

      <h2>Traduction(s)</h2>
      Lorem ipsum dolor sit amet mattis molestie vulputate fermentum senectus.
      Augue erat cursus bibendum vel augue mollis maecenas nibh sapien
      facilisis. Volutpat sagittis integer aliqua morbi platea duis morbi
      ultrices sodales augue nibh. Quisque lobortis posuere eleifend mollis
      nulla magna dolore ultrices faucibus leo. Scelerisque tempor blandit
      ornare libero nulla fusce nec auctor purus malesuada velit eros enim.
      Mollis justo interdum congue justo porta turpis auctor. Nibh etiam erat
      eiusmod justo enim consectetur labore. Scelerisque vivamus luctus duis
      quisque integer libero labore. Vestibulum purus lacus eros vel nisi odio
      lobortis. Hac eiusmod non urna adipiscing magna convallis neque netus
      dolore purus laoreet maecenas. Orci aliquam scelerisque leo justo egestas
      tortor posuere arcu massa rhoncus pellentesque sed. Egestas non gravida
      blandit velit pellentesque eget imperdiet aenean a interdum semper
      quisque. Pharetra blandit rhoncus platea iaculis massa mi quam fusce
      tortor dapibus interdum quam. Molestie dictum pretium eget eleifend proin
      semper pretium mattis vestibulum netus praesent. Faucibus dictumst dui
      lobortis elit dapibus fames erat nibh fames labore. In velit a aliquam
      auctor tempor leo scelerisque eleifend mauris condimentum molestie congue.
      Nulla tempus etiam diam nullam est etiam quisque. Euismod vivamus porta
      fringilla non id faucibus lectus facilisis bibendum posuere. Fames nibh
      lobortis posuere porta elit porta proin lobortis pretium do facilisi ac
      nulla. Nunc augue suspendisse eget diam lectus facilisi elementum eu id
      labore consequat sodales. Dapibus auctor aenean elit lectus ac massa
      dictum egestas lacinia etiam elementum vestibulum. Eu velit massa dapibus
      vulputate lobortis curabitur aenean. Erat massa pretium ultricies faucibus
      facilisi quis duis porta ornare et eros volutpat orci. Sodales magna
      blandit orci faucibus nullam semper vel eleifend luctus adipiscing orci
      suspendisse ultricies augue. Tristique at tempor augue quam dapibus
      blandit a rhoncus magna hendrerit lectus blandit enim fusce.
    </div>
  </div>
</template>

<script setup>
import { marked } from "marked";

const selComm = ref();

const callback1 = (e) => {
  selComm.value = e;
};

const props = defineProps(["source"]);

const markdownToHtml = computed(() => {
  return marked(props.source.data.content);
});
</script>

<style scoped>
p {
  font-size: 18px;
}
.layout-comment-sidebar {
  min-width: 40%;
}
.stick {
  position: sticky;
  top: 5rem;
}
.section {
  position: relative;
  top: -8rem;
}
</style>
