<template>
  <div class="nav-source pl-2">
    <div class="flex justify-center items-center py-2">
      <button class="layout-topbar-button" @click="$emit('openNavSource')">
        <i class="pi pi-bars"></i>
      </button>
    </div>
    </div>
  
</template>



<style lang="scss" scoped>
Button {
  /* background-color: #0288d1; */
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.25rem 0.4rem;
  border-radius: 3px;
}
.nav-source {
  height: calc(100vh - 5rem);
}
.p-button {
  margin-right: 0.5rem;
}

.layout-topbar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: sticky;
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
</style>
