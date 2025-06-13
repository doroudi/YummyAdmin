import type { Brand } from './Brand'
import type { Category } from './Category'

export interface Product {
  id: string
  code: string
  name: string
  image: Blob
  brand: Brand
  category: Category
  bestPrice: number
  price: number
  images: Array<Blob>
  status: ProductStatus
  stock: boolean
}

export interface ProductListDto {
  id: string
  code: string
  name: string
  image: string
  category: Category
  bestPrice: string
  price: string
  rate: number
  status: ProductStatus
  stock: boolean
}

export enum ProductStatus {
  NotActive = 0,
  Active = 1,
  Draft = 2,
}

export interface ProductCreateModel extends Product {
  description: string
  categoryId: string | number
  brandId: string | number
  tags: Array<string>
}
