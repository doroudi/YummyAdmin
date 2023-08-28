<script setup lang="ts">
import type { MenuOption } from 'naive-ui'
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from '@vicons/ionicons5'
import { storeToRefs } from 'pinia'
import { NIcon } from 'naive-ui/es/icon'

const layoutStore = useLayoutStore()
const { collapsed, isRtl } = storeToRefs(layoutStore)
const { t } = useI18n()
const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    icon: renderIcon(BookIcon),
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    icon: renderIcon(PersonIcon),
    disabled: true,
    children: [
      {
        label: 'Rat',
        key: 'rat',
      },
    ],
  },
  {
    label: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true,
    icon: renderIcon(WineIcon),
  },
  {
    label: 'Dance Dance Dance',
    key: 'Dance Dance Dance',
    icon: renderIcon('AcUnitRound'),
    children: [
      {
        type: 'group',
        label: 'People',
        key: 'people',
        children: [
          {
            label: 'Narrator',
            key: 'narrator',
            icon: renderIcon('PersonIcon'),
          },
          {
            label: 'Sheep Man',
            key: 'sheep-man',
            icon: renderIcon('PersonIcon'),
          },
        ],
      },
      {
        label: 'Beverage',
        key: 'beverage',
        icon: renderIcon('WineIcon'),
        children: [
          {
            label: 'Whisky',
            key: 'whisky',
          },
        ],
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Sandwich',
            key: 'sandwich',
          },
        ],
      },
      {
        label: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<template>
  <n-layout-sider
    :visible="true" :modal="false" :position="isRtl ? 'right' : 'left'" :dismissable="false"
    :show-close-icon="false" :class="{ collapsed }"
  >
    <template #header>
      <div class="flex items-center w-full">
        <img src="@/assets/images/logo.png" alt="logo" class="logo">
        {{ (!collapsed) ? t('title') : '' }}
      </div>
    </template>
    <!-- <nav class="main-menu">
      <ul>
        <li>
          <RouterLink to="/" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.dashboard')) as string" icon="i-bx-grid-alt"
            />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/Stats" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.stats')) as string" icon="i-bx-bar-chart-alt"
            />
          </RouterLink>
        </li>
        <li class="separator" />
        <li>
          <RouterLink to="/Products" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.products')) as string" icon="i-bx-package"
            />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/Categories" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.categories')) as string" icon="i-bx-category-alt"
            />
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/Orders" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2 "
              :label="(!collapsed && t('menu.orders')) as string"
              icon="i-bx-bxs-shopping-bag-alt"
            />
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/Comments" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.comments')) as string" icon="i-bx-chat"
            />
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/Blog" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2 "
              :label="(!collapsed && t('menu.blog')) as string" icon="i-bx-book-open"
            />
          </RouterLink>
        </li>

        <li>
          <RouterLink to="/Customers" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.customers')) as string" icon="i-bx-user"
            />
          </RouterLink>
        </li>

        <li class="separator" />
        <li>
          <RouterLink to="/Settings" active-class="active">
            <Button
              class="w-full p-button-text p-button-sm p-button-plain mb-2"
              :label="(!collapsed && t('menu.settings')) as string" icon="i-bx-cog"
            />
          </RouterLink>
        </li>
      </ul>
    </nav> -->

    <n-menu
      :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
      :options="menuOptions"
    />
  </n-layout-sider>
</template>

<style lang="scss">
.logo {
    width: 33px;
    margin-right: 0.8rem;
    margin-left: 0.5rem;
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
