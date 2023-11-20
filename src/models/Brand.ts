export interface Brand {
  id: string
  name: string
  image: string
  url: string
}

export interface BrandCreateModel {
  name: string
  image?: string
  url: string
}
