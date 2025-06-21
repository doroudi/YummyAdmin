export interface TaskGroup {
  id: number
  title: string
  icon: string
  bgColor?: string
}

export interface TaskItem {
  id: number
  groupId: number
  title: string
  isDone?: boolean
  isFavorite?: boolean
  isToday?: boolean
  order?: number
  doneDate?: Date
  createDate?: Date
}

export interface TaskCreateModel {
  title: string
  groupId: number
}

export interface GroupCreateModel {
  title: string
  icon: string
  bgColor?: string
}
