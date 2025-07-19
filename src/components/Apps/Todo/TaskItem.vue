<script setup lang="ts">
import {
  Delete20Regular as DeleteIcon,
  Star24Filled as FilledStarIcon,
  Star24Regular as StarIcon,
} from '@vicons/fluent'

import { NCheckbox } from 'naive-ui'
import type { TaskItem } from '~/models/Todo'
interface Props {
  task: TaskItem
}

const { t } = useI18n()
const { renderIcon } = useRender()
const props = defineProps<Props>()
const isDone = ref<boolean>(props.task.isDone)
const isChecked = ref(isDone.value)
const emits = defineEmits(['toggle', 'fav', 'delete'])

function update() {
  emits('toggle', isChecked.value)
}
function toggleFav() {
  emits('fav')
}

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

function handleContextMenu(e: MouseEvent) {
  e.preventDefault()
  showDropdown.value = false
  nextTick().then(() => {
    showDropdown.value = true
    x.value = e.clientX
    y.value = e.clientY
  })
}

const options = [
  {
    label: t('common.delete'),
    key: 'delete',
    icon: renderIcon(DeleteIcon),
  },
]

function handleSelect(action: string) {
  if (action === 'delete') {
    emits('delete')
  }
  showDropdown.value = false
}
</script>

<template>
    <div class="task-item flex justify-between items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-3.5 rounded-md"
        :class="{ done: isDone, favorite: task.isFavorite }" @contextmenu="handleContextMenu">
        <div class="flex items-center">
            <NCheckbox v-model:checked="isDone" @on-update:checked="update" class="me-2 circle">
                <span>{{ task.title }}</span>
            </NCheckbox>

        </div>
        <NButton text @click="toggleFav" me-1>
            <template #icon>
                <NIcon size="1.3rem">
                    <FilledStarIcon color="gold" v-if="task.isFavorite" />
                    <StarIcon v-else />
                </NIcon>
            </template>
        </NButton>

        <n-dropdown v-if="showDropdown" :on-clickoutside="() => showDropdown = false" placement="bottom-start"
            trigger="manual" :x="x" :y="y" :options="options" :show="showDropdown" @select="handleSelect" />
    </div>

</template>

<style scoped lang="scss">
.circle {
    --n-border-radius: 50%;
    --n-size: 20px;

    .n-checkbox .n-checkbox-box {
        border-radius: 50% !important;
    }
}

.task-item {
    cursor: pointer;
    opacity: 0.9;
    border: solid 1px transparent;

    &.done {
        text-decoration: line-through;
    }

    &.favorite {
        border: solid 1px gold;
    }
}
</style>