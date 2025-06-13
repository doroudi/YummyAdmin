<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui/es/form/src/interface'
import { storeToRefs } from 'pinia'

import type { LoginViewModel } from '~/models/Account'

const { t } = useI18n()
const accountStore = useAccountStore()
const { isLoading } = storeToRefs(accountStore)
const registerInfo = ref<LoginViewModel>({ username: '', password: '' })
const loginFailed = ref(false)
const router = useRouter()
const formRef = ref<FormInst | null>(null)

async function register() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const registerResult = await accountStore.register(registerInfo.value)
      if (registerResult) {
        useNotifyStore().success(t('register.successMessage'))
        setTimeout(() => router.push('/'), 500)
      } else {
        loginFailed.value = true
        setTimeout(() => {
          loginFailed.value = false
        }, 2000)
      }
    }
  })
}

const rules: FormRules = {
  username: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('login.validations.userNameRequired'),
    },
  ],
  password: [
    {
      required: true,
      trigger: ['blur', 'change'],
      message: t('login.validations.passwordRequired'),
    },
  ],
}
</script>

<route lang="yaml">
meta:
  title: register
  layout: auth
  authRequired: false
</route>

<template>
  <div class="bg flex justify-center items-center h-screen">
    <div class="register-box w-full px-3 md:px-0">
      <div class="md:shadow-lg bg-white dark:bg-slate-800 rounded-md w-full">
        <div class="p-5">
          <div class="text-2xl font-medium mb-8">
            {{ t('register.title') }}
          </div>

          <n-form ref="formRef" :model="registerInfo" :rules="rules" @submit.prevent="register()">
            <n-form-item class="mb-1" path="username" :label="t('register.username')">
              <n-input id="name" v-model:value="registerInfo.username" autofocus :placeholder="t('register.username')" />
            </n-form-item>
            <n-form-item class="mb-1" path="password" :label="t('register.password')">
              <n-input
                id="name" v-model:value="registerInfo.password" type="password" show-password-on="mousedown"
                :placeholder="t('register.password')"
              />
            </n-form-item>
            <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
              {{ t('register.button') }}
            </n-button>
          </n-form>
          <div class="text-center pt-4 text-sm">
            <span class="line-height-3">{{ t('register.haveAccount') }}</span>
            <RouterLink to="/account/login" class="no-underline mx-1 text-blue-500 cursor-pointer">
              {{ t('register.login') }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="mt-3 flex justify-between items-center">
        <LanguageSelect />
        <ThemeSwitch class="mr-2" />
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.register-box {
  max-width: 380px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #000;
  -webkit-box-shadow: 0 0 0 1000px #eff0f1 inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
