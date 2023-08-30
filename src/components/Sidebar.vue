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
  <n-layout-sider collapse-mode="width" :class="{ collapsed }">
    <div class="flex items-center w-full p-4">
      <img src="@/assets/images/logo.png" alt="logo" class="logo">
      {{ (!collapsed) ? t('title') : '' }}
    </div>
    <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
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
