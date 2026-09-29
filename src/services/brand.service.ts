import type { Brand } from '~/models/Brand'
import { useGenericService } from './generic.service'

export const useBrandService = () => {
  const base = useGenericService<Brand, string>('Brand')
  return {
    ...base,
  }
}
