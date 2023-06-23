import { defineStore } from "pinia";

export const useNavStore = defineStore("navigation", () => {
  const sourceID = ref("");
  const comID = ref("");
  const navVisibility = ref(true);
  const comVisibility = ref(false)
  const selectedSourceID = ref("");
  const selectedThemeID = ref("");
  const selectedKeywordID = ref("")

  function closeNav() {
    navVisibility.value = false;
  }
  function openNav() {
    navVisibility.value = false;
  }
  function toggleNav() {
    navVisibility.value = !navVisibility.value;
  }
  return { sourceID, comID, navVisibility, comVisibility, selectedSourceID, selectedKeywordID, selectedThemeID, toggleNav, openNav, closeNav };
});