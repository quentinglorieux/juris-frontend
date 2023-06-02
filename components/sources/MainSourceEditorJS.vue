<template>
  <div style="width:100px">  
    <div v-for="item in listItems">
      <div v-for="block in item">
        <div v-html="block"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Directus } from "@directus/sdk";
import edjsHTML from "editorjs-html";
// const directus = new Directus("http://127.0.0.1:8055/");
const directus = new Directus("https://jurisdirectus.rubidiumweb.eu/");

const edjsParser = edjsHTML({ nestedlist: nestedListParser });
function nestedListParser(block) {
  const data = block.data;
  const type = data.style === "ordered" ? "ol" : "ul";
  const items = data.items.reduce((acc, item) => acc + `<li>${item.content}</li>`, "");
  return `<${type}>${items}</${type}>`;
}
const listItems = ref([]);
async function retrieveSources() {
  const publicData = await directus.items("sources").readByQuery();
  
  var L = publicData.data;
  console.log(L[0])
  listItems.value = L.map((i) => edjsParser.parse(i.editorjs));
}
retrieveSources();
</script>
