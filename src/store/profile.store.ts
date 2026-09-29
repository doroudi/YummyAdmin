import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Profile, ProfileSettings } from '~/models/Profile'
import { useProfileService } from '~/services/profile.service'

export const useProfileStore = defineStore('Profile', () => {
  const profileService = useProfileService()
  const userProfile = ref<Profile>({} as Profile)
  const userSettings = ref<ProfileSettings>({} as ProfileSettings)
  const isLoading = ref(false)

  async function loadUserProfile() {
    isLoading.value = true

    try {
      const profile = await profileService.getUserProfile()
      userProfile.value = profile
    } finally {
      isLoading.value = false
    }
  }

  async function loadSettings() {
    const settings = await profileService.getUserSettings()
    userSettings.value = settings
  }

  return {
    userProfile,
    loadUserProfile,
    isLoading,
    loadSettings,
    userSettings,
  }
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot))
