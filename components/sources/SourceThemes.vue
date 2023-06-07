<template>
  <div class="flex">
    <NuxtLink to="/themes" @click="navStore.selectedThemeID = source.data.theme_id.id"> 
      <Tag
        class="mr-2 text-sm"
        severity="warning"
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

console.log(props.source.data)

</script>
