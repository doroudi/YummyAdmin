<script setup lang="ts">
import {
  PersonSettings20Regular as AccountSettingsIcon,
  PersonSettings20Filled as AccountSettingsIconActive,
  AppFolder20Regular as AppsIcon,
  DoorArrowRight20Regular as AuthIcon,
  CheckmarkStarburst20Regular as BrandsIcon,
  CheckmarkStarburst20Filled as BrandsIconActive,
  Folder24Regular as CategoryIcon,
  Folder24Filled as CategoryIconSelected,
  DataTrending16Regular as ChartsIcon,
  ChatMultiple20Regular as ChatAppIcon,
  ChatMultiple20Filled as ChatAppIconActive,
  Dismiss24Filled as CloseIcon,
  Color24Regular as ColorsIcon,
  Color24Filled as ColorsIconActive,
  PuzzlePiece24Regular as ComponentsIcon,
  AppsAddIn24Regular as CreateProductIcon,
  AppsAddIn24Filled as CreateProductIconActive,
  People24Regular as CustomersIcon,
  People24Filled as CustomersIconActive,
  Board24Regular as DashboardIcon,
  ChartMultiple20Regular as DashboardIcon1,
  ChartMultiple20Filled as DashboardIcon1Active,
  ArrowTrendingLines24Regular as DashboardIcon2,
  Table28Regular as DataIcon,
  Table28Filled as DataIconActive,
  ErrorCircle24Regular as ErrorIcon,
  Cart24Regular as eCommerceIcon,
  PersonLightbulb20Regular as ForgetIcon,
  FormNew24Regular as FormsIcon,
  Cart24Regular as InvoicesIcon,
  Cart24Filled as InvoicesIconActive,
  PersonLock20Regular as LoginIcon,
  ErrorCircleSettings20Regular as MaintenanceIcon,
  ShieldError24Regular as NotFoundIcon,
  DocumentLink20Regular as PagesIcon,
  BoxMultiple20Regular as ProductsIcon2,
  BoxMultiple20Filled as ProductsIcon2Active,
  PersonAdd20Regular as RegisterIcon,
  StarThreeQuarter20Filled as ReviewIcon,
  Settings28Regular as SettingsIcon,
  CheckmarkCircle24Regular as TodoAppIcon,
  CheckmarkCircle24Filled as TodoAppIconActive,
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

const menuOptions: SidebarMenuOption[] = [
  {
    label: t('menu.dashboard'),
    key: 'index',
    icon: DashboardIcon,
    children: [
      {
        label: t('menu.eCommerce'),
        key: 'dashboard-ecommerce',
        icon: DashboardIcon1,
        activeIcon: DashboardIcon1Active,
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
    label: t('menu.components'),
    key: 'components',
    icon: ComponentsIcon,
    children: [
      {
        label: t('menu.charts'),
        route: '/components/charts',
        key: 'components-charts',
        icon: ChartsIcon,
      },
      // {
      //   label: t('menu.forms'),
      //   route: '/components/forms',
      //   key: 'components-forms',
      //   icon: FormsIcon,
      // },
      // {
      //   label: t('menu.data'),
      //   route: '/components/data',
      //   key: 'components-data',
      //   icon: DataIcon,
      //   activeIcon: DataIconActive,
      // },
      // {
      //   label: t('menu.typography'),
      //   route: '/components/typography',
      //   key: 'components-typography',
      //   icon: TypographyIcon,
      //   activeIcon: TypographyIconActive,
      // },
    ],
  },

  {
    label: t('menu.eCommerce'),
    icon: eCommerceIcon,
    children: [
      {
        label: t('menu.products'),
        route: '/products',
        key: 'products',
        icon: ProductsIcon2,
        activeIcon: ProductsIcon2Active,
      },
      {
        label: t('menu.createProduct'),
        route: '/products/create',
        key: 'products-create',
        icon: CreateProductIcon,
        activeIcon: CreateProductIconActive,
      },
      {
        label: t('menu.categories'),
        route: '/categories',
        key: 'categories',
        icon: CategoryIcon,
        activeIcon: CategoryIconSelected,
      },
      {
        label: t('menu.brands'),
        route: '/brands',
        key: 'brands',
        icon: BrandsIcon,
        activeIcon: BrandsIconActive,
      },
      {
        label: t('menu.colors'),
        route: '/colors',
        key: 'colors',
        icon: ColorsIcon,
        activeIcon: ColorsIconActive,
      },
      {
        label: t('menu.reviews'),
        route: '/reviews',
        key: 'reviews',
        icon: ReviewIcon,
      },
      {
        label: t('menu.orders'),
        route: '/orders',
        key: 'orders',
        icon: InvoicesIcon,
        activeIcon: InvoicesIconActive,
        showBadge: true,
      },
      {
        label: t('menu.customers'),
        route: '/customers',
        key: 'customers',
        icon: CustomersIcon,
        activeIcon: CustomersIconActive,
      },
    ],
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
        activeIcon: ChatAppIconActive,
      },
      {
        label: t('menu.todo'),
        route: '/apps/todo',
        isNew: true,
        key: 'apps-todo',
        icon: TodoAppIcon,
        activeIcon: TodoAppIconActive,
      },
    ],
  },

  {
    label: t('menu.pages'),
    key: 'pages',
    icon: AuthIcon,
    children: [
      {
        label: t('menu.login'),
        route: '/account/login',
        key: 'account-login',
        icon: LoginIcon,
      },
      {
        label: t('menu.register'),
        route: '/account/register',
        key: 'account-register',
        icon: RegisterIcon,
      },

      {
        label: t('menu.forgetPassword'),
        route: '/account/ForgotPassword',
        key: 'account-forget-password',
        icon: ForgetIcon,
      },
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
      {
        label: t('menu.maintenance'),
        route: '/maintenance',
        key: 'maintenance',
        icon: MaintenanceIcon,
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
        key: 'account-profile',
        icon: AccountSettingsIcon,
        activeIcon: AccountSettingsIconActive,
      },
    ],
  },
]
const router = useRouter()
//mobile view
router.beforeEach(() => {
  layoutStore.closeSidebar()
})
</script>

<template>
  <n-layout-sider :native-scrollbar="false" collapse-mode="width" :collapsed-width="mobileMode ? 0 : 64"
    :collapsed="effectiveCollapsed"
    :class="{ 'collapsed': effectiveCollapsed, 'mobile-mode': mobileMode, 'support-mode': layoutStore.supportEnabled }">
    <div class="logo-container mb-4">
      <div flex w-full justify-between items-center>
        <div flex w-full justify-start items-center>
          <div class="logo-bg"><img src="@/assets/images/logo.png" alt="logo" class="logo"></div>
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
      :options="menuOptions" />
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

  .logo-bg {
    width: 38px;
    height: 38px;
    display: flex;
    margin: 0 .34rem;
    justify-content: center;
    align-items: center;

    .logo {
      width: 34px;
      object-fit: cover;
    }
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

  .n-menu-item-group>.n-menu-item-group-title {
    display: none;
  }

  .p-button-label {
    display: none;
  }
}

.n-menu .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
  background-color: rgba(189, 189, 189, 0.15);
}

.n-menu-tooltip span {
  color: #e4e4e4 !important;
}

.n-layout-sider {
  background-color: transparent;
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

  .n-menu-item-group-title {
    margin-left: auto;
    margin-right: 32px;
  }
}

.support-mode {
  .n-scrollbar>.n-scrollbar-container {
    max-height: calc(100% - 120px);
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

.n-menu-item-group .n-submenu .n-menu-item-content.n-menu-item-content--collapsed {
  padding-left: 22px !important;
}

.n-menu .n-menu-item-group .n-menu-item-group-title {
  height: 20px;
}
</style>
