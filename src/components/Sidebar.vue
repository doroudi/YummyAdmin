<script setup lang="ts">
import { type MenuOption, NBadge } from 'naive-ui'
import {
  PersonSettings20Regular as AccountSettingsIcon,
  CheckmarkStarburst16Regular as BrandsIcon,
  Folder32Regular as CategoryIcon,
  Color24Regular as ColorsIcon,
  CommentMultiple32Regular as CommentsIcon,
  People28Regular as CustomersIcon,
  Home32Regular as DashboardIcon,
  Emoji24Regular as FeedbackIcon,
  Cart24Regular as InvoicesIcon,
  News20Regular as NewsIcon,
  ChannelAlert24Regular as NotifyIcon,
  DocumentLink20Regular as PagesIcon,
  Apps28Filled as ProductsIcon,
  BoxMultiple20Regular as ProductsIcon2,
  StarThreeQuarter20Filled as ReviewIcon,
  Settings28Regular as SettingsIcon,
  Chat24Regular as SmsIcon,
  PeopleCall20Regular as SupportIcon,
  ContentSettings20Regular as WebsiteSettingsIcon,
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
    label: () => renderLabel(t('menu.dashboard'), '/'),
    key: 'dashboard',
    icon: renderIcon(DashboardIcon),
  },
  // {
  //   label: 'Statistics',
  //   key: 'statistics',
  //   icon: renderIcon(StatsIcon),
  // },
  {
    label: () => t('menu.productManagement'),
    key: 'productManagement',
    icon: renderIcon(ProductsIcon),
    children: [
      {
        label: () => renderLabel(t('menu.products'), '/products'),
        key: 'Products',
        icon: renderIcon(ProductsIcon2),
      },
      {
        label: () => renderLabel(t('menu.categories'), '/categories'),
        key: 'categories',
        icon: renderIcon(CategoryIcon),
      },
      {
        label: () => renderLabel(t('menu.brands'), '/brands'),
        key: 'brands',
        icon: renderIcon(BrandsIcon),
      },
      {
        label: () => renderLabel(t('menu.colors'), '/colors'),
        key: 'colors',
        icon: renderIcon(ColorsIcon),
      },

    ],
  },
  {
    label: () => renderLabel(t('menu.orders'), '/orders'),
    key: 'orders',
    icon: renderIcon(InvoicesIcon, true),
  },
  {
    label: () => t('menu.feedbacks'),
    key: 'feedbacks',
    icon: renderIcon(FeedbackIcon),
    children: [
      {
        label: () => renderLabel(t('menu.reviews'), '/reviews'),
        key: 'reviews',
        icon: renderIcon(ReviewIcon),
      },
      {
        label: () => renderLabel(t('menu.messages'), '/messages'),
        key: 'messages',
        icon: renderIcon(CommentsIcon),
      },
      {
        label: () => renderLabel(t('menu.support'), '/support'),
        key: 'messages',
        icon: renderIcon(SupportIcon),
      },
    ],
  },
  {
    label: () => renderLabel(t('menu.customers'), '/customers'),
    key: 'customers',
    icon: renderIcon(CustomersIcon),
  },
  {
    label: () => t('menu.announcement'),
    key: 'notify',
    icon: renderIcon(NewsIcon),
    children: [
      {
        label: () => renderLabel(t('menu.news'), '/news'),
        key: 'news',
        icon: renderIcon(NewsIcon),
      },
      {
        label: () => renderLabel(t('menu.notifications'), '/notify'),
        key: 'notifications',
        icon: renderIcon(NotifyIcon),
      },
      {
        label: () => renderLabel(t('menu.sms'), 'sms'),
        key: 'sms',
        icon: renderIcon(SmsIcon),
      },
    ],
  },
  {
    label: () => t('menu.pages'),
    key: 'Pages',
    icon: renderIcon(PagesIcon),
    children: [
      {
        label: () => renderLabel(t('menu.login'), '/account/login'),
      },
    ],
  },
  {
    label: () => t('menu.settings'),
    key: 'settings',
    icon: renderIcon(SettingsIcon),
    children: [
      {
        label: () => renderLabel(t('menu.accountSettings'), '/account'),
        key: 'account-settings',
        icon: renderIcon(AccountSettingsIcon),
      },
      {
        label: () => renderLabel(t('menu.websiteSettings'), '/website-settings'),
        key: 'website-settings',
        icon: renderIcon(WebsiteSettingsIcon),
      },
    ],
  },
]

function renderIcon(icon: any, showBadge = false) {
  if (showBadge)
    return () => h(NBadge, { processing: true, dot: true, type: 'success', offset: [-2, 2] }, { default: () => h(NIcon, {}, { default: () => h(icon) }) })

  return () => h(NIcon, null, { default: () => h(icon, {}) })
}
</script>

<template>
  <n-layout-sider
    :native-scrollbar="false" collapse-mode="width" :collapsed-width="64" :collapsed="collapsed"
    :class="{ collapsed }"
  >
    <div class="logo-container">
      <div flex items-center>
        <img src="@/assets/images/logo.png" alt="logo" class="logo">
        <!-- <img v-if="!collapsed" src="@/assets/images/text-logo.png" class="text-logo" alt="yummy admin" title="text-logo"> -->
        <h1 v-if="!collapsed" class="main-title">
          {{ t('title') }}
        </h1>
      </div>
    </div>
    <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
  </n-layout-sider>
</template>

<style lang="scss">
.logo-container {
  display: flex;
  align-items: center;
  padding: 1.5rem 1.1rem 0.5rem 1.1rem;
  transition: all 100ms;
  line-height: 1;

  .main-title {
    font-family: Quicksand, Shabnam;
    font-size: 1.3rem;
    font-weight: 500;
    user-select: none;

  }

  .logo {
    width: 33px;
    margin-right: 0.8rem;
    margin-left: 0.5rem;
  }

  .text-logo {
    max-width: 175px;
  }
}

.collapsed {
  .logo-container {
    padding: 1.5rem 0.5rem 0.5rem .5rem;
  }
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

.n-menu-item {
  user-select: none;
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
