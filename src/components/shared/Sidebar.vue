<script setup lang="ts">
import {
  PersonSettings20Regular as AccountSettingsIcon,
  AppFolder20Regular as AppsIcon,
  DoorArrowRight20Regular as AuthIcon,
  CheckmarkStarburst16Regular as BrandsIcon,
  Folder24Filled as CategoryIcon,
  ChatMultiple20Regular as ChatAppIcon,
  Dismiss24Filled as CloseIcon,
  Color24Regular as ColorsIcon,
  People24Regular as CustomersIcon,
  Board24Regular as DashboardIcon,
  ChartMultiple20Regular as DashboardIcon1,
  ArrowTrendingLines24Regular as DashboardIcon2,
  ErrorCircle24Regular as ErrorIcon,
  PersonLightbulb20Regular as ForgetIcon,
  Cart24Regular as InvoicesIcon,
  PersonLock20Regular as LoginIcon,
  ShieldError24Regular as NotFoundIcon,
  DocumentLink20Regular as PagesIcon,
  BoxCheckmark24Regular as ProductsIcon,
  BoxMultiple20Regular as ProductsIcon2,
  PersonAdd20Regular as RegisterIcon,
  StarThreeQuarter20Filled as ReviewIcon,
  Settings28Regular as SettingsIcon,
  CheckmarkCircle24Regular as TodoAppIcon,
} from '@vicons/fluent'

import { storeToRefs } from 'pinia'
import type { SidebarMenuOption } from './SidebarMenu.vue'

const layoutStore = useLayoutStore()
const { collapsed, forceCollapsed, mobileMode, mobileMenuClosed } =
  storeToRefs(layoutStore)
const { t } = useI18n()

const effectiveCollapsed = computed(() => {
  if (mobileMode.value) return mobileMenuClosed.value

  return collapsed.value || forceCollapsed.value
})

const newMenuOptions: SidebarMenuOption[] = [
  {
    label: t('menu.dashboard'),
    key: 'index',
    icon: DashboardIcon,
    children: [
      {
        label: t('menu.eCommerce'),
        key: 'dashboard-ecommerce',
        icon: DashboardIcon1,
        route: '/',
      },
      {
        label: t('menu.analytics'),
        route: '/Dashboard/Analytics',
        key: 'dashboard-analytics',
        icon: DashboardIcon2,
      },
    ],
  },
  {
    label: t('menu.productManagement'),
    key: 'productManagement',
    icon: ProductsIcon,
    children: [
      {
        label: t('menu.products'),
        route: '/products',
        key: 'products',
        icon: ProductsIcon2,
      },
      {
        label: t('menu.categories'),
        route: '/categories',
        key: 'categories',
        icon: CategoryIcon,
      },
      {
        label: t('menu.brands'),
        route: '/brands',
        key: 'brands',
        icon: BrandsIcon,
      },
      {
        label: t('menu.colors'),
        route: '/colors',
        key: 'colors',
        icon: ColorsIcon,
      },
      {
        label: t('menu.reviews'),
        route: '/reviews',
        key: 'reviews',
        icon: ReviewIcon,
      },
    ],
  },
  {
    label: t('menu.orders'),
    route: '/orders',
    key: 'orders',
    icon: InvoicesIcon,
    showBadge: true,
  },
  {
    label: t('menu.customers'),
    route: '/customers',
    key: 'customers',
    icon: CustomersIcon,
  },
  {
    label: t('menu.apps'),
    key: 'apps',
    icon: AppsIcon,
    children: [
      {
        label: t('menu.chat'),
        route: '/apps/chat',
        key: 'apps-chat',
        icon: ChatAppIcon,
      },
      {
        label: t('menu.todo'),
        route: '/apps/todo',
        isNew: true,
        key: 'apps-todo',
        icon: TodoAppIcon,
      },
    ],
  },
  {
    label: t('menu.authentication'),
    key: 'auth',
    icon: AuthIcon,
    children: [
      {
        label: t('menu.login'),
        route: '/account/login',
        key: 'login',
        icon: LoginIcon,
      },
      {
        label: t('menu.register'),
        route: '/account/register',
        key: 'register',
        icon: RegisterIcon,
      },

      {
        label: t('menu.forgetPassword'),
        route: '/account/ForgotPassword',
        key: 'forget-password',
        icon: ForgetIcon,
      },
    ],
  },
  {
    label: t('menu.settings'),
    key: 'settings',
    icon: SettingsIcon,
    children: [
      {
        label: t('menu.accountSettings'),
        route: '/account/profile',
        key: 'account-settings',
        icon: AccountSettingsIcon,
      },
    ],
  },
  {
    label: t('menu.other'),
    key: 'other',
    icon: PagesIcon,
    children: [
      {
        label: t('menu.notFound'),
        route: '/404',
        key: 'not-found',
        icon: NotFoundIcon,
      },
      {
        label: t('menu.error'),
        route: '/error',
        key: 'error',
        icon: ErrorIcon,
      },
    ],
  },
]
const router = useRouter()
router.beforeEach(() => {
  layoutStore.closeSidebar()
})
</script>

<template>
  <n-layout-sider :native-scrollbar="false" collapse-mode="width" :collapsed-width="mobileMode ? 0 : 64"
    :collapsed="effectiveCollapsed" :class="{ 'collapsed': effectiveCollapsed, 'mobile-mode': mobileMode }">
    <div class="logo-container mb-4">
      <div flex w-full justify-between items-center>
        <div flex w-full justify-start items-center>
          <img src="@/assets/images/logo.png" alt="logo" class="logo">
          <h1 class="main-title">
            {{ t('title') }}
          </h1>
        </div>

        <n-button v-if="mobileMode" mx-2 size="small" tertiary circle @click="layoutStore.closeSidebar">
          <template #icon>
            <NIcon size="1.2rem">
              <CloseIcon />
            </NIcon>
          </template>
        </n-button>
      </div>
    </div>
    <SidebarMenu :collapsed-width="mobileMode ? 0 : 64" :collapsed-icon-size="mobileMode ? 30 : 20"
      :options="newMenuOptions" />
  </n-layout-sider>
</template>

<style lang="scss">
.n-scrollbar {
  z-index: 1;
}
.logo-container {
  display: flex;
  align-items: center;
  padding: 1.5rem 0.8rem 0.5rem 1.1rem;
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

.mobile-mode {
  max-width: 100% !important;
  width: 100% !important;
}

.mobile-mode.collapsed {
  max-width: 0 !important;
}

.collapsed {

  .logo-container {
    padding: 1.5rem 0.5rem 0.5rem .5rem;
  }

  .main-title {
    display: none;
  }
}

.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
  background-color: rgba(189, 189, 189, 0.15);
}

.n-layout-sider {
  background-color: transparent;
}

.collapsed {
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
}

.n-menu-item {
  user-select: none;
}

.main-menu {
  .active {
    .p-button {

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
    border-bottom: solid 1px #f4f4f5;
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
