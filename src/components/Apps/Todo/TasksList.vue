<script setup lang="ts">
import {
  Add20Regular as AddIcon,
  Circle20Regular as CircleIcon,
  Send28Filled as SendIcon,
} from '@vicons/fluent'
import { storeToRefs } from 'pinia'
import type { TaskGroup, TaskItem } from '~/models/Todo'
interface Props {
  group: TaskGroup
}

const { t } = useI18n()
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
const orderedTasks = ref<TaskItem[]>(
  tasks.value.filter((x: TaskItem) => !x.isDone),
)
const doneTasks = ref<TaskItem[]>(tasks.value.filter((x: TaskItem) => x.isDone))
watch(
  () => tasks.value,
  () => {
    orderedTasks.value = tasks.value
      .filter((x: TaskItem) => !x.isDone)
      .sort(
        (item1: TaskItem, item2: TaskItem) =>
          Number(item2.isFavorite ?? false) - Number(item1.isFavorite ?? false),
      )

    doneTasks.value = tasks.value.filter((x: TaskItem) => x.isDone)
  },
  { deep: true },
)

const taskName = ref('')
const inputIsActive = ref(false)
onMounted(() => {
  store.loadGroupTasks(props.group.id)
})

function createTask() {
  if (!taskName.value.trim()) return

  store.createTask({
    title: taskName.value.trim(),
    groupId: props.group.id,
  })

  taskName.value = ''
}

function toggleDoneTask(id: number, isChecked: boolean) {
  store.toggleDoneTask(id)
  if (!isChecked) playSound()
}

function playSound() {
  const audioEl = document.createElement('audio')
  audioEl.style.display = 'none'
  audioEl.src = '../../../assets/sounds/done.mp3'
  audioEl.autoplay = true
  document.body.appendChild(audioEl)
  setTimeout(() => {
    document.body.getElementsByTagName('audio')[0].remove()
  }, 890)
}

function favTask(id: number) {
  store.toggleFavTask(id)
}

function deleteTask(id: number) {
  store.deleteTask(id)
}
</script>

<template>
  <section class="tasks-box flex flex-col items-stretch justify-stretch p-8"
    :style="{ 'background-color': group?.bgColor }">
    <GroupTitle :group="group" />

    <div class="flex-1 flex-col justify-end mb-1 overflow-y-auto">
      <n-scrollbar>
        <TaskItem v-for="item of orderedTasks" :key="item.id" :task="item" class="my-2"
          @toggle="value => toggleDoneTask(item.id, value)" @fav="favTask(item.id)" @delete="deleteTask(item.id)" />

        <div pt-2>
          <n-collapse>
            <n-collapse-item :title="`${t('todoApp.completed')} (${doneTasks.length})`" name="done">
              <TaskItem v-for="item of doneTasks" :key="item.id" :task="item" class="my-2"
                @toggle="value => toggleDoneTask(item.id, value)" @fav="favTask(item.id)"
                @delete="deleteTask(item.id)" />
            </n-collapse-item>
          </n-collapse>
        </div>

      </n-scrollbar>
    </div>

    <section id="create-task" class="create-task p-4 bg-gray-100 dark:bg-gray-700 rounded-md  flex items-center">
      <NIcon size="1.4rem" me-3>
        <AddIcon v-if="!inputIsActive" />
        <CircleIcon v-else />
      </NIcon>
      <input v-model="taskName" :placeholder="t('todoApp.createTask')" class="message-input flex-1"
        @keypress.enter="createTask" @focus="inputIsActive = true" @blur="inputIsActive = false">
    </section>
  </section>
</template>

<style scoped lang="scss">
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
