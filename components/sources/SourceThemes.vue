<template>
  <div class="flex p-3 pt-4">
    <NuxtLink to="/themes" @click="navStore.selectedThemeID = source.data.theme_id.id"> 
      <Tag
        class="mr-2 text-lg hover:bg-slate-700"
        :value="source.data.theme_id.titre"
      ></Tag>
    </NuxtLink>

  </div>
</template>

<script setup>
import { useNavStore } from "~/stores/navigation";
const navStore = useNavStore();
const props = defineProps(["source"]);

for (let theme in props.source.data.theme_id.id)
{
  console.log(theme)
}



</script>