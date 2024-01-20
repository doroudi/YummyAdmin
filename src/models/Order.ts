import type { Address, Customer } from './Customer'

export interface Order {
  id: string
  customer: Customer
  items: OrderItem[]
  address: Address
  status: OrderStatus
  createdDate: Date
  totalPrice: number
}

export interface OrderItem {
  id: string
}

export enum OrderStatus {
  Submitted,
  Processing,
  ReadyToSend,
  Sent,
  Delivered,
}
