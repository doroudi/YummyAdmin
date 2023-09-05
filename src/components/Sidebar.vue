<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import {
  Folder28Regular as CategoryIcon,
  Home28Regular as DashboardIcon,
  Apps28Filled as ProductsIcon,
} from '@vicons/fluent'

import { storeToRefs } from 'pinia'
import { NIcon } from 'naive-ui/es/icon'

const layoutStore = useLayoutStore()
const { collapsed } = storeToRefs(layoutStore)
const { t } = useI18n()
const menuOptions: MenuOption[] = [
  {
    label: 'Dashboard',
    key: 'dashboard',
    icon: renderIcon(DashboardIcon),
  },
  {
    label: 'Categories',
    key: 'categories',
    icon: renderIcon(CategoryIcon),
  },
  {
    label: 'Products',
    key: 'products',
    icon: renderIcon(ProductsIcon),
  },

]

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <n-layout-sider collapse-mode="width" :collapsed-width="64" :collapsed="collapsed" :class="{ collapsed }">
    <div class="flex items-center justify-between w-full p-4">
      <div flex items-center>
        <img src="@/assets/images/logo.png" alt="logo" class="logo">
        {{ (!collapsed) ? t('title') : '' }}
      </div>
    </div>
    <n-menu :options="menuOptions" />
  </n-layout-sider>
</template>

<style lang="scss">
.logo {
  width: 33px;
  margin-right: 0.8rem;
  margin-left: 0.5rem;
}

.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
  background-color: rgb(243 243 245 / 51%);
}

.n-layout-sider {
  background-color: transparent;
}

.collapsed {
  max-width: 100px;

  .p-button-label {
    display: none;
  }
}

.p-button {
  .p-button-label {
    text-align: left;
  }
}

.rtl {
  .logo {
    margin-left: 0.8rem;
    margin-right: .5rem;

  }

  .p-button {
    .p-button-label {
      text-align: right;
    }

    .p-button-icon-left {
      margin-right: 0;
      margin-left: 0.5rem;
    }
  }
}

.main-menu {
  .active {
    .p-button {
      background: #f4f4f5;

      .p-button-label,
      .p-button-icon {
        color: var(--primary-color);
      }
    }

    ul>li>a {
      display: block;
    }
  }

  .separator {
    border-bottom: solid 1px rgb(224, 224, 224);
    margin-bottom: .5rem;
  }
}

.p-sidebar-header {
  justify-content: center;
  font-weight: bold;
  padding-top: 1.7rem !important;
}

.p-sidebar-header-content {
  width: 100%;
}
</style>
