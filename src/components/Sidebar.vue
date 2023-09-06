<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import {
  Folder32Regular as CategoryIcon,
  CommentMultiple32Regular as CommentsIcon,
  People28Regular as CustomersIcon,
  Home32Regular as DashboardIcon,
  Cart24Regular as InvoicesIcon,
  News20Regular as NewsIcon,
  Apps24Filled as ProductsIcon,
  Settings28Regular as SettingsIcon,
} from '@vicons/fluent'
import { RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { NIcon } from 'naive-ui/es/icon'

const layoutStore = useLayoutStore()
const { collapsed } = storeToRefs(layoutStore)
const { t } = useI18n()

function renderLabel(title: string, path: string) {
  return h(
    RouterLink,
    {
      to: {
        path,
      },
    },
    { default: () => title },
  )
}
const menuOptions: MenuOption[] = [
  {
    label: () => renderLabel('Dashboard', ''),
    key: 'dashboard',
    icon: renderIcon(DashboardIcon),
  },
  {
    label: () => renderLabel('Categories', 'categories'),
    key: 'categories',
    icon: renderIcon(CategoryIcon),
  },
  {
    label: () => renderLabel('Products', 'products'),
    key: 'products',
    icon: renderIcon(ProductsIcon),
    children: [
      {
        label: renderLabel('Add New', 'products/create'),
        key: 'add-product',
      },
    ],
  },
  {
    label: () => renderLabel('Invoices', 'invoices'),
    key: 'invoices',
    icon: renderIcon(InvoicesIcon),
  },
  {
    label: () => renderLabel('Comments', 'comments'),
    key: 'comments',
    icon: renderIcon(CommentsIcon),
  },
  {
    label: () => renderLabel('Customers', 'customers'),
    key: 'customers',
    icon: renderIcon(CustomersIcon),
  },
  {
    label: () => renderLabel('Comments', 'comments'),
    key: 'comments',
    icon: renderIcon(SettingsIcon),
  },
  {
    label: () => renderLabel('News', 'news'),
    key: 'news',
    icon: renderIcon(NewsIcon),
  },
]

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <n-layout-sider collapse-mode="width" :collapsed-width="64" :collapsed="collapsed" :class="{ collapsed }">
    <div flex items-center justify-between w-full p-4>
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
