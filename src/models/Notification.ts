export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  isForce: boolean
}

export enum NotificationType {
  info = 0,
  alert = 1,
  security = 2,
  order = 3,
  customer = 4,
}
