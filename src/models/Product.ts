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
  notActive,
  active,
  draft,
}

export interface ProductCreateModel {

}
