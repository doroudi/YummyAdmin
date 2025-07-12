import { faker } from '@faker-js/faker/locale/en'
import { http, HttpResponse } from 'msw'
import type { TaskCreateModel, TaskGroup, TaskItem } from '~/models/Todo'

const tasks: TaskItem[] = [
  {
    id: 1,
    groupId: 1,
    createDate: new Date(),
    isDone: false,
    isToday: true,
    title: 'Go Gym',
  },
  {
    id: 2,
    groupId: 1,
    createDate: new Date(),
    isDone: false,
    isToday: true,
    title: 'MINST Implementation',
  },
  {
    id: 3,
    groupId: 1,
    createDate: new Date(),
    isDone: true,
    isToday: false,
    title: 'ToDo App',
  },
  {
    id: 4,
    groupId: 2,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Email App',
  },
  {
    id: 5,
    groupId: 2,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Search feature',
  },
  {
    id: 6,
    groupId: 2,
    createDate: new Date(),
    isDone: true,
    isToday: false,
    title: 'ToDo App',
  },
  {
    id: 7,
    groupId: 3,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Landscape in the mist',
  },
  {
    id: 8,
    groupId: 3,
    createDate: new Date(),
    isDone: true,
    isToday: false,
    title: 'God Father 1',
  },
  {
    id: 9,
    groupId: 4,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Grocery',
  },
  {
    id: 10,
    groupId: 4,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Bread',
  },
  {
    id: 11,
    groupId: 4,
    createDate: new Date(),
    isDone: true,
    isToday: false,
    title: 'Smart watch',
  },
  {
    id: 12,
    groupId: 5,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Home Loan',
  },
  {
    id: 13,
    groupId: 5,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'VPS',
  },
  {
    id: 14,
    groupId: 6,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Designing Database solutions',
  },
  {
    id: 15,
    groupId: 6,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'CheckList',
  },
  {
    id: 16,
    groupId: 6,
    createDate: new Date(),
    isDone: false,
    isToday: false,
    title: 'Karamazov brothers',
  },
  {
    id: 17,
    groupId: 6,
    createDate: new Date(),
    isDone: true,
    isToday: false,
    title: 'Hafez',
  },
]
const handlers = [
  http.get('/api/todo/groups', ({ request }) => {
    return HttpResponse.json({ items: createFakeTaskGroups() }, { status: 200 })
  }),
  http.get('/api/todo/groups/:id/tasks', ({ params }) => {
    const { id } = params
    return HttpResponse.json(
      createFakeTaskItems(Number.parseInt(id?.toString() ?? '1')),
      { status: 200 },
    )
  }),
  http.post('/api/todo/groups/:id/tasks', async ({ params, request }) => {
    const newItem = (await request.json()) as TaskCreateModel
    const task: TaskItem = {
      id: faker.number.int({ max: 2000 }),
      title: newItem.title,
      createDate: new Date(),
      groupId: newItem.groupId,
    }
    tasks.unshift(task)
    return HttpResponse.json(task, { status: 201 })
  }),
  http.post('/api/todo/groups/:id/tasks', ({ params, request }) => {
    const { id } = params
  }),
]

function createFakeTaskGroups(): TaskGroup[] {
  const groups: TaskGroup[] = [
    { id: 2, title: 'YummyAdmin', icon: '😋', bgColor: '#1aa58b' },
    { id: 3, title: 'ToWatch', icon: '🎞️', bgColor: '#e58f6b' },
    { id: 4, title: 'Buy List', icon: '🛒', bgColor: '' },
    { id: 5, title: 'Payments', icon: '💸', bgColor: '' },
    { id: 6, title: 'Reading List', icon: '📖', bgColor: '' },
  ]
  return groups
}

function createFakeTaskItems(groupId: number): TaskItem[] {
  return tasks.filter((x) => x.groupId === groupId)
}

export default handlers
