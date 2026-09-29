import { useApi } from '~/composables/useApi'
import type {
  GroupCreateModel,
  TaskCreateModel,
  TaskGroup,
  TaskItem,
} from '~/models/Todo'

export const useTodoService = () => {
  const api = useApi('todo')

  async function loadGroups(): Promise<TaskGroup[]> {
    const response = await api.get<{ items: TaskGroup[] }>('groups')
    return response.items
  }

  async function loadTasks(groupId: number): Promise<TaskItem[]> {
    const response = await api.get<TaskItem[]>(`groups/${groupId}/tasks`)
    return response
  }

  async function createTask(task: TaskCreateModel) {
    const response = await api.post<TaskItem>(
      `groups/${task.groupId}/tasks`,
      task,
    )
    return response
  }

  async function createGroup(group: GroupCreateModel) {
    const response = await api.post<TaskItem>('groups', group)
    return response
  }

  return {
    loadGroups,
    loadTasks,
    createTask,
    createGroup,
  }
}
