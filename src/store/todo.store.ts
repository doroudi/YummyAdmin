import { acceptHMRUpdate, defineStore } from 'pinia'
import type {
  GroupCreateModel,
  TaskCreateModel,
  TaskGroup,
  TaskItem,
} from '~/models/Todo'
import todoService from '~/services/todo.service'

export const useTodoAppStore = defineStore('Todo', () => {
  const groups = ref<TaskGroup[]>([])
  const tasks = ref<TaskItem[]>([])

  const isLoadingGroups = ref(false)
  const isLoadingTasks = ref(false)

  async function loadGroups() {
    isLoadingGroups.value = true
    try {
      groups.value = await todoService.loadGroups()
    } finally {
      isLoadingGroups.value = false
    }
  }

  async function loadGroupTasks(groupId: number) {
    isLoadingTasks.value = true
    try {
      tasks.value = await todoService.loadTasks(groupId)
    } finally {
      isLoadingTasks.value = false
    }
  }

  function createGroup() {
    try {
      const newGroup: GroupCreateModel = {
        title: 'New Group',
        icon: '🆕',
      }
      groups.value.push(newGroup)
    } catch (error) {}
  }

  function toggleDoneTask(id: number) {
    const task = tasks.value.find((x) => x.id === id)
    task.isDone = true
    task.doneDate = new Date()
  }

  function toggleFavTask(id: number) {
    const task = tasks.value.find((x) => x.id === id)
    task.isFavorite = !task.isFavorite
  }

  async function createTask(task: TaskCreateModel) {
    try {
      const result = await todoService.createTask(task)
      tasks.value.unshift({ id: result.id, title: task.title })
    } finally {
    }
  }

  return {
    isLoadingGroups,
    isLoadingTasks,
    groups,
    tasks,
    loadGroups,
    loadGroupTasks,
    createGroup,
    createTask,
    toggleDoneTask,
    toggleFavTask,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTodoAppStore, import.meta.hot))
