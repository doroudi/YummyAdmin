import GenericService from './generic.service'
import type { Color } from '~/models/Color'
import { ApiService } from '~/common/api/api-service'

const apiService = new ApiService('Color')
class ColorService extends GenericService<Color, string> {
  constructor() {
    super(apiService)
  }
}
export default new ColorService()
