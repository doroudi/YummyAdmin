<script setup lang="ts">
const { t } = useI18n()

const menu = ref()
const items = ref(
  [
    { label: t('userMenu.options'), icon: 'i-bx-cog', to: '/options' },
    { label: t('userMenu.signOut'), icon: 'i-bx-log-out', to: '/logout' },
  ])

function toggleMenu(event: any) {
  menu.value.toggle(event)
}
</script>

<template>
  <div class="flex items-center">
    <Avatar class="mx-2" />
    <div class="flex flex-col">
      <h3 class="username">
        User Name
      </h3>
      <h5 class="role text-dark dark:text-slate-400">
        User Role
      </h5>
    </div>
    <Button
      icon="i-bx-chevron-down" class="p-button p-button-rounded p-button-link p-button-plain p-button-sm"
      @click="toggleMenu"
    />
    <TieredMenu ref="menu" :model="items" :popup="true" />
  </div>
</template>

<style lang="scss">
.username {
    font-size: 0.8rem;
    font-weight: bold;
}

.role {
    font-size: 0.7rem;
}

.p-tieredmenu .p-menuitem-active>.p-submenu-list {
    right: 100%;
    left: auto;
}
.rtl {

.p-tieredmenu .p-menuitem-active>.p-submenu-list {
    right: auto;
    left: 100%;
}
}
</style>
