import type { Color } from '~/models/Color'
import { useGenericService } from './generic.service'

export const useColorService = () => {
  const base = useGenericService<Color, string>('Color')
  return {
    ...base,
  }
}
