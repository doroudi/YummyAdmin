import type { Product } from '~/models/Product'
import { useGenericService } from './generic.service'

export const useProductService = () => {
  const base = useGenericService<Product, string>('Product')
  return {
    ...base,
  }
}
