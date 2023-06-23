import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    sources: {},
    authors: {},
    keywords: {},
    themes: {},
    commentaires:{},
  }),
})
