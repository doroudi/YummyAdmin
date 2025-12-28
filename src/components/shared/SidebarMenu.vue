<script setup lang="ts">
import type { MenuInst, MenuOption } from 'naive-ui/es/components'

defineModel<string>()
export interface SidebarMenuOption {
  type?: string
  label?: string
  key?: string
  icon?: any
  activeIcon?: any
  selectedIcon?: any
  isNew?: boolean
  showBadge?: boolean
  route?: string
  children?: SidebarMenuOption[]
  props?: any
}

export interface Props {
  options: SidebarMenuOption[]
}

const props = defineProps<Props>()
const route = useRoute()
const selectedMenuKey = ref('dashboard')
const menuRef = ref<MenuInst | null>(null)
const { renderIcon, renderLabel } = useRender()

onMounted(() => activateCurrentRoute())

function activateCurrentRoute() {
  setTimeout(() => {
    const keys = props.options.flatMap((m: SidebarMenuOption) =>
      m.children
        ? [m, ...m.children.flatMap((child) => child.children || child)]
        : m,
    )

    if (keys !== undefined) {
      selectedMenuKey.value =
        keys.find(
          (s: SidebarMenuOption) =>
            s.key?.toLowerCase() === route.name.toLowerCase(),
        )?.key ?? 'dashboard-ecommerce' //default route

      menuRef.value?.showOption(selectedMenuKey.value)
    }
  }, 20)
}

watch(
  () => route.name,
  () => {
    setTimeout(() => activateCurrentRoute(), 200)
  },
)

const items = computed(() =>
  props.options.map((o: SidebarMenuOption) => convertToMenuOption(o)),
)

function convertToMenuOption(item: SidebarMenuOption): MenuOption {
  return {
    type: item.type,
    props: item.props,
    label: item.route
      ? () =>
          item.label !== undefined
            ? renderLabel(item.label, item.route!, item.isNew ?? false)
            : () => null
      : () => item.label,
    icon:
      item.type === 'group'
        ? () => null
        : renderIcon(
            isActiveRoute(item) && item.activeIcon
              ? item.activeIcon
              : item.icon,
            item.showBadge,
          ),
    key: item.key,
    children: item.children?.map((i) => convertToMenuOption(i)),
  }
}

function isActiveRoute(item: SidebarMenuOption) {
  return selectedMenuKey.value.toLowerCase() === item.key?.toLowerCase()
}
</script>

<template>
  <n-menu ref="menuRef" v-bind="$attrs" accordion v-model:value="selectedMenuKey" :options="items" />
</template>


<style scoped></style>