import { ApiService } from '~/common/api/api-service'
import type { Profile, ProfileSettings } from '~/models/Profile'

const apiService = new ApiService('Profile')
class ProfileService {
  constructor() { }
  async getUserProfile(): Promise<Profile> {
    const response = await apiService.get<Profile>('user-profile')
    return response
  }

  async getUserSettings(): Promise<ProfileSettings> {
    const response = await apiService.get<ProfileSettings>('user-settings')
    return response
  }
}
export default new ProfileService()
