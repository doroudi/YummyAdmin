<script setup lang="ts">
import {
  Star24Filled as FilledStarIcon,
  Star24Regular as StarIcon,
} from '@vicons/fluent'
import { NCheckbox } from 'naive-ui'
import type { TaskItem } from '~/models/Todo'
interface Props {
  task: TaskItem
}
const props = defineProps<Props>()
const isDone = ref(props.task.isDone)
const emits = defineEmits(['done', 'fav'])
watch(
  () => isDone.value,
  () => emits('done', isDone.value),
)
function toggleFav() {
  emits('fav')
}
</script>

<template>
    <div class="task-item flex justify-between items-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-3 py-3.5 rounded-md"
        :class="{ done: isDone, favorite: task.isFavorite }">
        <div class="flex items-center">
            <NCheckbox v-model:checked="isDone" class="me-2 circle">
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
    </div>
</template>

<style scoped lang="scss">
.circle {
    --n-border-radius: 50%;
    --n-size: 20px;
    .n-checkbox .n-checkbox-box {
        border-radius: 50%!important;
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