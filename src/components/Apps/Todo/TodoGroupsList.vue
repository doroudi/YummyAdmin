<script lang="ts" setup>
import type { TaskGroup } from '~/models/Todo'

interface Props {
  groups: TaskGroup[]
}
defineProps<Props>()
const emits = defineEmits(['select'])
const selectedGroup = ref<TaskGroup | null>(null)
function selectGroup(item: TaskGroup) {
  selectedGroup.value = item
  emits('select', item)
  window.umami?.track('Todo:SelectGroup', { title: item.title })
}
</script>

<template>
    <NList hoverable clickable class="px-1">
        <NListItem v-for="item of groups" :key="item.id" @click="selectGroup(item)"
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
    </NList>
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