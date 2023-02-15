<template>
        <div class="flex">
      <Tag
        v-for="kw in sourceNode.keywords"
        class="mr-2 text-sm"
        severity="info"
        :value="kw"
      ></Tag>
    </div>
</template>

<script setup>
const props = defineProps(["sourceNode"]);
</script>