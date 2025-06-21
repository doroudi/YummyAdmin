
<script setup lang="ts">
import type { TaskGroup } from '~/models/Todo'

const props = defineProps<{ group: TaskGroup }>()
const emits = defineEmits(['update'])
const editMode = ref(false)
const groupTitle = ref(props.group.title)

function goEditMode() {
  editMode.value = true
}

function updateTitle() {
  editMode.value = false
  emits('update', props.group)
}
</script>

<template>
    <h2 class="task-title flex items-center mb-4">
        <span class="icon">{{ group.icon }}</span>
        <span v-if="!editMode" @dblclick="goEditMode">{{ group.title }}</span>
        <n-input v-else style="display: inline-block;" size="large" v-model:value="groupTitle" @blur="updateTitle" />
    </h2>
</template>

<style scoped lang="scss">
.task-title {
    font-size: 1.7rem;
    font-weight: bold;

    .icon {
        display: inline-flex;
        margin: 0 .4rem;
    }
}
</style>