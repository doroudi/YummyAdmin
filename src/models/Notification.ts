export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  isForce: boolean
}

export enum NotificationType {
  info,
  alert,
  security,
  order,
  customer,
}
