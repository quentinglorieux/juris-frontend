<template>
  <div class="flex">
 
 
    <NavSource
      
      @sourceSelected="(e) => (sourceSelection = e)"
      :visible=store.navVisibility ></NavSource>
    <MainSource
      class=""
      :source="sourceSelection"
      
    />
  </div>
</template>

<script setup>
import { useCounterStore } from "@/store/counter";
const store = useCounterStore();
const sourceSelection = ref("");
const props = defineProps(["visible", "other"]);




</script>

<style scoped lang="scss">
.slayout-navbar {
  transform: translateX(-100px);
}
.slayin-navbar {
  transform: translateX(0%);
  transition-duration: 200ms;
}
</style>