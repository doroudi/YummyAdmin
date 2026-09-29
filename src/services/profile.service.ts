import { useApi } from '~/composables/useApi'
import type { Profile, ProfileSettings } from '~/models/Profile'

export const useProfileService = () => {
  const api = useApi('Profile')

  async function getUserProfile(): Promise<Profile> {
    const response = await api.get<Profile>('user-profile')
    return response
  }

  async function getUserSettings(): Promise<ProfileSettings> {
    const response = await api.get<ProfileSettings>('user-settings')
    return response
  }

  return {
    getUserProfile,
    getUserSettings,
  }
}
