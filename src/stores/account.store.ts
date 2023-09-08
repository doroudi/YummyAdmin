import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LoginViewModel } from '~/models/LoginInfo'

export const useAccountStore = defineStore('account', () => {
  function login(loginInfo: LoginViewModel) {
    accoutService
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
