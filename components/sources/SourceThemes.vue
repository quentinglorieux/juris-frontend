<template>
  <div class="flex">
    
      <Tag
        v-for="theme in source.data.theme_id"
        class="mr-2 text-sm"
        severity="info"
        :value="theme"
      ></Tag>


  </div>
</template>

<script setup>

const props = defineProps(["source"]);


</script>
