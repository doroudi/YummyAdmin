
<script setup lang="ts">
import type { MenuInst, MenuOption } from 'naive-ui/es/components'
defineModel<string>()
export interface SidebarMenuOption {
  label: string
  key: string
  icon?: any
  selectedIcon?: any
  isNew?: boolean
  showBadge?: boolean
  route?: string
  children?: SidebarMenuOption[]
}

export interface Props {
  options: SidebarMenuOption[]
}

const props = defineProps<Props>()
const route = useRoute()
const selectedMenuKey = ref('dashboard')
const menuRef = ref<MenuInst | null>(null)

onMounted(() => activateCurrentRoute())

function activateCurrentRoute() {
  const keys = props.options.flatMap((m: SidebarMenuOption) => m.children || m)
  if (keys !== undefined) {
    selectedMenuKey.value =
      keys.find(
        (s: SidebarMenuOption) =>
          s.key.toLowerCase() === route.name.toLowerCase(),
      )?.key ?? 'dashboard-ecommerce' //default route
    menuRef.value?.showOption(selectedMenuKey.value)
  }
}

const items = computed(() =>
  props.options.map((o: SidebarMenuOption) => convertToMenuOption(o)),
)

const { renderIcon, renderLabel } = useRender()

function convertToMenuOption(item: SidebarMenuOption): MenuOption {
  return {
    label: item.route
      ? () => renderLabel(item.label, item.route, item.isNew ?? false)
      : () => item.label,
    icon: renderIcon(item.icon, item.showBadge),
    key: item.key, //TODO: auto generate key
    children: item.children?.map((i) => convertToMenuOption(i)),
  }
}
</script>

<template>
    <n-menu ref="menuRef" v-bind="$attrs" v-model:value="model" :options="items" />
</template>


<style scoped></style>