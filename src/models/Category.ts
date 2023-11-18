export interface Category {
  id: number
  name: string
  productsCount: number
  children?: Category[]
}

export interface CategoryCreateModel {
  name: string
  parentId: number
}
