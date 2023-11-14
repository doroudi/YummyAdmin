import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LoginViewModel } from '~/models/LoginInfo'

export const useAccountStore = defineStore('account', () => {
  const user = ref<LoginViewModel>({ username: '', password: '' })
  const isLoading = ref(false)
  const loginFailed = ref(false)
  function login() {
    setTimeout(async () => {
      if (user.value.username === 'admin' && user.value.password === 'admin') {
        // const response = await authService.login(user.value.username, user.value.password)
        isLoading.value = false
        //   toast.add({ severity: 'success', summary: 'Login Succeed', detail: 'Redirecting', life: 3000 })
        return
      }

      isLoading.value = false
      loginFailed.value = true
      // toast.add({ severity: 'error', summary: t('login.failedMessage'), detail: 'Error Message', life: 3000 })
      setTimeout(() => loginFailed.value = false, 2000)
    }, 1000)
  }

  function logout() {
    // useRouter().push()
  }

  return {
    isLoading,
    loginFailed,
    user,
    login,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
