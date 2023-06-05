import { defineStore } from "pinia";

export const useNavStore = defineStore("navigation", () => {
  const sourceID = ref("");
  const comID = ref("");
  const navVisibility = ref(true);
  const selectedSourceID = ref("");

  function closeNav() {
    navVisibility.value = false;
  }
  function openNav() {
    navVisibility.value = false;
  }
  function toggleNav() {
    navVisibility.value = !navVisibility.value;
  }
  return { sourceID, comID, navVisibility, selectedSourceID, toggleNav, openNav, closeNav };
});
