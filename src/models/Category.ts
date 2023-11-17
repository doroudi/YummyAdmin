export interface Category {
  id: number
  name: string
  productsCount: number
  subItems?: Category[]
}

export interface CategoryCreateModel {
  name: string
  parentId: number
}
