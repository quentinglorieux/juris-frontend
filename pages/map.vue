<template>
    map : Counter: {{ store.count }}
</template>

<script setup>
import { useCounterStore } from "~/stores/navigation";
const store = useCounterStore();
const count = computed(() => store.count);

</script>
