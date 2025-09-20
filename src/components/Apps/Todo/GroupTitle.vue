<script setup lang="ts">
import type { TaskGroup } from '~/models/Todo'

import {
  Checkmark28Filled as CheckIcon,
  Edit24Regular as EditIcon,
} from '@vicons/fluent'

const props = defineProps<{ group: TaskGroup }>()
const emits = defineEmits(['update'])
const editMode = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function goEditMode() {
  if (props.group.isToday) return
  editMode.value = true
  inputRef.value.focus()
}

function updateTitle() {
  editMode.value = false
  emits('update', props.group)
}
</script>

<template>
  <div class="flex justify-between">
    <h2 class="task-title flex flex-1 mr-2 items-center mb-4">
      <div class="flex flex-col">
        <div class="flex row">
          <span class="icon">{{ group.icon }}</span>
          <span class="ms-2" v-if="!editMode" @dblclick="goEditMode">{{ group.title }}</span>
          <n-input v-else size="large" ref="inputRef" class="edit-input" v-model:value="group.title"
            @blur="updateTitle" />
        </div>
        <span v-if="group.isToday" class="ms-15  text-sm font-normal">{{ new Date().toDateString() }}</span>
      </div>
    </h2>


    <n-button icon quaternary circle v-if="!group.isToday">
      <n-icon v-if="!editMode" @click="goEditMode" :component="EditIcon"></n-icon>
      <n-icon v-else @click="updateTitle" :component="CheckIcon"></n-icon>
    </n-button>
  </div>


</template>

<style scoped lang="scss">
.task-title {
  font-size: 1.7rem;
  font-weight: bold;

  .icon {
    display: inline-flex;
    margin: 0 .4rem;
  }

  .edit-input {
    display: inline-block;
    font-size: 1.7rem;
    font-weight: bold;
    background-color: #CCCCCC40;
    border-color: transparent
  }
}
</style>