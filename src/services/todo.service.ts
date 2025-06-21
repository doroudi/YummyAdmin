import { ApiService } from '~/common/api/api-service'
import type {
  GroupCreateModel,
  TaskCreateModel,
  TaskGroup,
  TaskItem,
} from '~/models/Todo'
const apiService = new ApiService('todo')
class TodoService {
  async loadGroups(): Promise<TaskGroup[]> {
    const response = await apiService.get<{ items: TaskGroup[] }>('groups')
    return response.items
  }

  async loadTasks(groupId: number) {
    const response = await apiService.get<TaskGroup>(`groups/${groupId}/tasks`)
    return response
  }

  async createTask(task: TaskCreateModel) {
    const response = await apiService.post<TaskItem>(
      `groups/${task.groupId}/tasks`,
      task,
    )
    return response
  }

  async createGroup(group: GroupCreateModel) {
    const response = await apiService.post<TaskItem>('groups', group)
    return response
  }
}
export default new TodoService()
