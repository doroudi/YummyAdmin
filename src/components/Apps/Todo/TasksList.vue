<script setup lang="ts">
import {
  Add20Regular as AddIcon,
  Circle20Regular as CircleIcon,
  Send28Filled as SendIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import type { TaskGroup } from '~/models/Todo'
interface Props {
  group: TaskGroup
}
const props = defineProps<Props>()

watch(
  () => props.group,
  (newVal: TaskGroup, oldVal: TaskGroup) => {
    if (oldVal && newVal && oldVal.id === newVal.id) return
    store.loadGroupTasks(newVal.id)
  },
)
const store = useTodoAppStore()
const { tasks } = storeToRefs(store)
const taskName = ref('')
// const createIsActive = computed(() => taskName.value.trim().length > 0)
const inputIsActive = ref(false)
onMounted(() => {
  store.loadGroupTasks(props.group.id)
})
function createTask() {
  if (taskName.value.trim()) {
    store.createTask({
      title: taskName.value,
      groupId: props.group.id,
    })
    taskName.value = ''
  }
}

function doneTask(id: number) {
  store.toggleDoneTask(id)
}

function favTask(id: number) {
  store.toggleFavTask(id)
}
</script>

<template>
    <section class="tasks-box flex flex-col items-stretch justify-stretch p-8"
        :style="{ 'background-color': group?.bgColor }">

        <h2 class="task-title flex items-center mb-4">
            <span class="icon">{{ group.icon }}</span>
            <span>{{ group.title }}</span>
        </h2>
        <div class="flex-1 flex-col justify-end mb-1 overflow-y-auto">
            <n-scrollbar>
                <TaskItem v-for="item of tasks" :key="item.id" :task="item" class="my-2" @done="doneTask(item.id)" @fav="favTask(item.id)" />
            </n-scrollbar>
        </div>

        <section id="create-task" class="create-task p-4 bg-gray-100 dark:bg-gray-700 rounded-md  flex items-center">
            <NIcon size="1.4rem" me-3>
                <AddIcon v-if="!inputIsActive" />
                <CircleIcon v-else />
            </NIcon>
            <input v-model="taskName" placeholder="Create new task" class="message-input flex-1"
                @keypress.enter="createTask" @focus="inputIsActive = true" @blur="inputIsActive = false">
        </section>
    </section>
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

.tasks-box {
    height: calc(100% - 51px);

    .message-input {
        background: transparent;
        border: none;

        &:focus {
            outline: none;
        }
    }
}
</style>
