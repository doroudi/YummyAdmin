<script setup lang="ts">
import {
  PersonSettings20Regular as AccountSettingsIcon,
  AppFolder20Regular as AppsIcon,
  DoorArrowRight20Regular as AuthIcon,
  CheckmarkStarburst16Regular as BrandsIcon,
  Folder24Regular as CategoryIcon,
  ChatMultiple20Regular as ChatAppIcon,
  Dismiss24Filled as CloseIcon,
  Color24Regular as ColorsIcon,
  People24Regular as CustomersIcon,
  Board24Regular as DashboardIcon,
  ChartMultiple20Regular as DashboardIcon1,
  ArrowTrendingLines24Regular as DashboardIcon2,
  PersonLightbulb20Regular as ForgetIcon,
  Cart24Regular as InvoicesIcon,
  PersonLock20Regular as LoginIcon,
  DocumentLink20Regular as PagesIcon,
  BoxCheckmark24Regular as ProductsIcon,
  BoxMultiple20Regular as ProductsIcon2,
  PersonAdd20Regular as RegisterIcon,
  StarThreeQuarter20Filled as ReviewIcon,
  Settings28Regular as SettingsIcon,
  CheckmarkCircle24Regular as TodoAppIcon,
} from '@vicons/fluent'
import type { MenuInst, MenuOption } from 'naive-ui'
import { storeToRefs } from 'pinia'

const layoutStore = useLayoutStore()
const { collapsed, forceCollapsed, mobileMode, mobileMenuClosed } =
  storeToRefs(layoutStore)
const { t } = useI18n()
const { renderIcon, renderLabel } = useRender()

const effectiveCollapsed = computed(() => {
  if (mobileMode.value) return mobileMenuClosed.value

  return collapsed.value || forceCollapsed.value
})

const menuOptions: MenuOption[] = [
  {
    label: () => t('menu.dashboard'),
    key: 'index',
    icon: renderIcon(DashboardIcon),
    children: [
      {
        label: () => renderLabel(t('menu.eCommerce'), '/'),
        key: 'dashboard-ecommerce',
        icon: renderIcon(DashboardIcon1),
      },
      {
        label: () => renderLabel(t('menu.analytics'), '/Dashboard/Analytics'),
        key: 'dashboard-analytics',
        icon: renderIcon(DashboardIcon2),
      },
    ],
  },
  {
    label: () => t('menu.productManagement'),
    key: 'productManagement',
    icon: renderIcon(ProductsIcon),
    children: [
      {
        label: () => renderLabel(t('menu.products'), '/products'),
        key: 'products',
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
      {
        label: () => renderLabel(t('menu.reviews'), '/reviews'),
        key: 'reviews',
        icon: renderIcon(ReviewIcon),
      },
    ],
  },
  {
    label: () => renderLabel(t('menu.orders'), '/orders'),
    key: 'orders',
    icon: renderIcon(InvoicesIcon, true),
  },
  {
    label: () => renderLabel(t('menu.customers'), '/customers'),
    key: 'customers',
    icon: renderIcon(CustomersIcon),
  },
  {
    label: () => t('menu.apps'),
    key: 'apps',
    icon: renderIcon(AppsIcon),
    children: [
      {
        label: () => renderLabel(t('menu.chat'), '/apps/chat'),
        key: 'apps-chat',
        icon: renderIcon(ChatAppIcon),
      },
      {
        label: () => renderLabel(t('menu.todo'), '/apps/todo'),
        key: 'apps-todo',
        icon: renderIcon(TodoAppIcon),
      },
    ],
  },
  {
    label: () => t('menu.authentication'),
    key: 'auth',
    icon: renderIcon(AuthIcon),
    children: [
      {
        label: () => renderLabel(t('menu.login'), '/account/login'),
        key: 'login',
        icon: renderIcon(LoginIcon),
      },
      {
        label: () => renderLabel(t('menu.register'), '/account/register'),
        key: 'register',
        icon: renderIcon(RegisterIcon),
      },

      {
        label: () =>
          renderLabel(t('menu.forgetPassword'), '/account/ForgotPassword'),
        key: 'forget-password',
        icon: renderIcon(ForgetIcon),
      },
    ],
  },
  {
    label: () => t('menu.settings'),
    key: 'settings',
    icon: renderIcon(SettingsIcon),
    children: [
      {
        label: () => renderLabel(t('menu.accountSettings'), '/account/profile'),
        key: 'account-settings',
        icon: renderIcon(AccountSettingsIcon),
      },
    ],
  },
  {
    label: () => t('menu.other'),
    key: 'other',
    icon: renderIcon(PagesIcon),
    children: [
      {
        label: () => renderLabel(t('menu.notFound'), '/404'),
        key: 'not-found',
      },
    ],
  },
]

const route = useRoute()
const selectedMenuKey = ref('dashboard')
const menuRef = ref<MenuInst | null>(null)

onMounted(() => activateCurrentRoute())

function activateCurrentRoute() {
  const keys = menuOptions.flatMap((m) => m.children || m) as [{ key: string }]
  if (keys !== undefined) {
    selectedMenuKey.value =
      keys.find((k) => k.key.toLowerCase() === route.name.toLowerCase())?.key ??
      'dashboard-ecommerce'
    menuRef.value?.showOption(selectedMenuKey.value)
  }
}

const router = useRouter()
router.beforeEach(() => {
  layoutStore.closeSidebar()
})
</script>

<template>
  <n-layout-sider
    :native-scrollbar="false" collapse-mode="width" :collapsed-width="mobileMode ? 0 : 64"
    :collapsed="effectiveCollapsed" :class="{ 'collapsed': effectiveCollapsed, 'mobile-mode': mobileMode }"
  >
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
    <n-menu
      ref="menuRef" v-model:value="selectedMenuKey" :collapsed-width="mobileMode ? 0 : 64"
      :collapsed-icon-size="mobileMode ? 30 : 20" :options="menuOptions"
    />
  </n-layout-sider>
</template>

<style lang="scss">
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
