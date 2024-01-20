import type { Customer } from './Customer'

export interface Review {
  id: string
  customer: Customer
  product: ReviewProduct
  date: Date
  rate: number
  comment: Comment
}

export interface Comment {
  id: string
  message: string
}

export interface ReviewProduct {
  id: string
  name: string
}
