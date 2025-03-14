import type { Address, Customer } from './Customer'

export interface OrderList {
  id: string
  customer: OrderCustomer
  address: Address
  status: OrderStatus
  createdDate: Date
  totalPrice: number
  itemsCount: number
}

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

export interface OrderCustomer {
  name: string
  id: string
  avatar: string
}
