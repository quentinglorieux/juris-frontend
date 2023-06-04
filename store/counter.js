import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', () => { 
  const sourceID = ref('')
  const comID=ref('')
  const navVisibility=ref(true)
  function closeNav() {
    navVisibility.value=false
  }
  function openNav() {
    navVisibility.value=false
  }
  function toggleNav() {
    navVisibility.value=!navVisibility.value
  }
  return { sourceID, comID, navVisibility, toggleNav,openNav,closeNav}
})
