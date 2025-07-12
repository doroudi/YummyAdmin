<script lang="ts" setup>
import { Delete20Regular as DeleteIcon } from '@vicons/fluent'
import type { TaskGroup } from '~/models/Todo'

interface Props {
  groups: TaskGroup[]
}
const props = defineProps<Props>()
const emits = defineEmits(['select'])
const selectedGroup = ref<TaskGroup | null>(null)
const { t } = useI18n()

const allGroups = computed(() => [
  { id: 1, title: t('todoApp.today'), icon: '📅' },
  ...props.groups,
])

onMounted(() => {
  setTimeout(() => {
    const item = allGroups.value.at(0)
    if (item) {
      selectedGroup.value = item
      emits('select', item)
    }
  }, 100)
})

const { renderIcon } = useRender()

const options = [
  {
    label: t('common.delete'),
    key: 'delete',
    icon: renderIcon(DeleteIcon),
  },
]

function selectGroup(item: TaskGroup) {
  selectedGroup.value = item
  emits('select', item)
  window.umami?.track('Todo:SelectGroup', { title: item.title })
}

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)
const selectedMenuId = ref(null)
function handleContextMenu(item: any, e: MouseEvent) {
  selectedMenuId.value = item.id
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}
const store = useTodoAppStore()
function handleSelect(action: string) {
  if (action === 'delete') {
    store.deleteGroup(selectedMenuId.value)
  }
  showDropdown.value = false
}
</script>

<template>
    <div>
        <NList hoverable clickable class="px-1">
            <NListItem v-for="item of allGroups" :key="item.id" @click="selectGroup(item)" @contextmenu="(e: MouseEvent) => handleContextMenu(item, e)"
                :class="{ selected: item.id === selectedGroup?.id }">
                <template #prefix>
                    <span class="icon text-lg">{{ item.icon }}</span>
                </template>
                <div class="flex flex-col">
                    <span class="text-sm text-gray-800 dark:text-white">
                        {{ item.title }}
                    </span>
                </div>

            </NListItem>
            <n-dropdown :on-clickoutside="() => showDropdown = false" placement="bottom-start" trigger="manual" :x="x"
                :y="y" :options="options" :show="showDropdown" @select="handleSelect" />
        </NList>
    </div>
</template>


<style scoped lang="scss">
.icon {
    position: relative;
}

.selected {
    font-weight: bold;
    background: var(--n-merged-color-hover);

    .icon {
        &::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 2px;
            height: 18px;
            width: 3px;
            border-radius: 3px;
            background: var(--primary-color);
        }
    }
}
</style>