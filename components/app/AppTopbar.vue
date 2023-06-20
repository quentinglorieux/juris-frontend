<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <!-- <img src="@/assets/logo.png" alt="logo" /> -->
      <span>JURIS project</span>
    </router-link>

    <!-- <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button> -->

    <!-- <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button> -->

    <Menubar
      class="layout-topbar-menu card relative z-2"
      :class="topbarMenuClasses"
      :model="items"
    />

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
        <i class="pi pi-search"></i>
        <span>Search</span>
      </button>
      <button @click="onSettingsClick()" class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useNavStore } from "~/stores/navigation";
import { useGlobalStore } from "~/stores/global";
const navStore = useNavStore();
const store = useGlobalStore();

const { $directus } = useNuxtApp();

const { layoutConfig, onMenuToggle, contextPath } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);

onMounted(() => {
  bindOutsideClickListener();
  onMenuToggle();
});

onBeforeUnmount(() => {
  unbindOutsideClickListener();
});

const items = ref([
  { label: "Accueil", icon: "pi pi-fw pi-home", to: "/" },
  { label: "Sources", icon: "pi pi-fw pi-th-large", to: "/sources" },
  { label: "Mots Clés", icon: "pi pi-fw pi-tags", to: "/keywords" },
  //   { label: "Thèmes", icon: "pi pi-fw pi-list", to: "/themes" },
  { label: "Thèmes", icon: "pi pi-fw pi-list", items: [] },
  { label: "Auteurs", icon: "pi pi-fw pi-users", items: [] }, // change the item.value[5] if remove Alt
  { label: "Map", icon: "pi pi-fw pi-share-alt", to: "/map" },
]);

async function retrieveAuthors() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("directus_users").readByQuery({
      fields: ["first_name,last_name,role"],
      filter: {
        role: {
          _starts_with: "aeeefb57-7b36",
        },
      },
    });
  });

  store.authors = publicData.value.data;

  for (let author of store.authors) {
    // items.value[1].items[3].items.push({
    items.value[4].items.push({
      label: author.last_name,
      icon: "pi pi-fw pi-user",
      to: "/auteur-" + author.last_name,
    });
  }
}

async function retrieveThemes() {
  const { data: publicData } = await useAsyncData(() => {
    return $directus.items("themes").readByQuery({
      fields: ["id,titre"],
    });
  });

  store.themes = publicData.value.data;

  for (let theme of store.themes) {
    // items.value[1].items[3].items.push({
    items.value[3].items.push({
      label: theme.titre,
      icon: "pi pi-fw pi-book",
      to: "/themes",
      command: () => {
        navStore.selectedThemeID = theme.id;
      },
    });
  }
}

// add authors
onMounted(() => {
  if (!store.authors[0]) {
    retrieveAuthors();
  }
  if (!store.themes[0]) {
    retrieveThemes();
  }
});

// const logoUrl = computed(() => {
//     return `${contextPath}layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
// });

// const logoUrl = "@/assets/logo.png"

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
  topbarMenuActive.value = false;
};
const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };
    document.addEventListener("click", outsideClickListener.value);
  }
};
const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};
const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;

  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};
</script>

<style lang="scss" scoped>
.layout-topbar {
  position: fixed;
  height: 5rem;
  z-index: 997;
  left: 0;
  top: 0;
  width: 100%;
  padding: 0 2rem;
  background-color: var(--surface-card);
  transition: left 0.2s;
  display: flex;
  align-items: center;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
    0px 1px 4px rgba(0, 0, 0, 0.08);

  .layout-topbar-logo {
    display: flex;
    align-items: center;
    color: var(--surface-900);
    font-size: 1.5rem;
    font-weight: 500;
    border-radius: 12px;

    img {
      height: 2.5rem;
      margin-right: 0.5rem;
    }
  }

  .layout-topbar-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    color: var(--text-color-secondary);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      color: var(--text-color);
      background-color: var(--surface-hover);
    }

    i {
      font-size: 1.5rem;
    }

    span {
      font-size: 1rem;
      display: none;
    }
  }
  .p-submenu-list {
    background-color: red;
  }
  .layout-menu-button {
    margin-left: 2rem;
  }

  .layout-topbar-menu-button {
    display: none;

    i {
      font-size: 1.25rem;
    }
  }

  .layout-topbar-menu {
    margin: 0 0 0 auto;
    padding: 0;
    list-style: none;
    display: flex;

    .layout-topbar-button {
      margin-left: 1rem;
    }
  }
}

@media (max-width: 991px) {
  .layout-topbar {
    justify-content: space-between;

    .layout-topbar-logo {
      width: auto;
      order: 2;
    }

    .layout-menu-button {
      margin-left: 0;
      order: 1;
    }

    .layout-topbar-menu-button {
      display: inline-flex;
      margin-left: 0;
      order: 3;
    }

    .layout-topbar-menu {
      margin-left: 0;
      position: absolute;
      flex-direction: column;
      background-color: var(--surface-overlay);
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.02), 0px 0px 2px rgba(0, 0, 0, 0.05),
        0px 1px 4px rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 1rem;
      right: 2rem;
      top: 5rem;
      min-width: 15rem;
      display: none;
      -webkit-animation: scalein 0.15s linear;
      animation: scalein 0.15s linear;

      &.layout-topbar-menu-mobile-active {
        display: block;
      }

      .layout-topbar-button {
        margin-left: 0;
        display: flex;
        width: 100%;
        height: auto;
        justify-content: flex-start;
        border-radius: 12px;
        padding: 1rem;

        i {
          font-size: 1rem;
          margin-right: 0.5rem;
        }

        span {
          font-weight: medium;
          display: block;
        }
      }
    }
  }
}
</style>