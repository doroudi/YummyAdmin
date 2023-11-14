export interface Category {
  id: number
  name: string
  productsCount: number
  subItems?: Category[]
}
