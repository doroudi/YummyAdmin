import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Account, LoginViewModel } from '~/models/Login'
import AccountService from '~/services/account.service'

export const useAccountStore = defineStore('account', () => {
  const user = ref<Account | null>(null)
  const isLoading = ref(false)
  const loginFailed = ref(false)

  async function login(loginInfo: LoginViewModel): Promise<boolean> {
    isLoading.value = true
    try {
      const response = await AccountService.login(loginInfo)
      if (response.isSucceed) {
        user.value = {
          token: response.token,
        }
        return true
      }

      return false
    }
    catch (error) {
      return false
    }
    finally {
      isLoading.value = false
    }
    // toast.add({ severity: 'error', summary: t('login.failedMessage'), detail: 'Error Message', life: 3000 })
  }

  function logout() {
    user.value = null
  }

  function isAuthenticated() {
    return (user.value?.token && user.value.token !== null) ?? false
  }

  return {
    isLoading,
    loginFailed,
    login,
    logout,
    isAuthenticated,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
