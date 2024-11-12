<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui/es/form/src/interface'
import { storeToRefs } from 'pinia'
import type { LoginViewModel } from '~/models/Login'

const { t } = useI18n()
const accountStore = useAccountStore()
const { isLoading } = storeToRefs(accountStore)
const loginInfo = ref<LoginViewModel>({ username: 'admin', password: 'admin' })
const loginFailed = ref(false)
const router = useRouter()
const formRef = ref<FormInst | null>(null)
async function login() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const loginSucceed = await accountStore.login(loginInfo.value)
      if (loginSucceed) {
        useNotifyStore().success(t('login.successMessage'))
        setTimeout(() => router.push('/'), 500)
      }
      else {
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
  title: Login
  layout: auth
  authRequired: false
</route>

<template>
  <div class="bg flex justify-center items-center h-screen">
    <div class="login-box w-full px-3 md:px-0">
      <div class="md:shadow-lg bg-white dark:bg-slate-800 rounded-md w-full" :class="{ failed: loginFailed }">
        <div class="hidden md:block banner" />
        <div class="p-5">
          <div class="text-2xl font-medium mb-8">
            {{ t('login.title') }}
          </div>
          <n-form ref="formRef" :model="loginInfo" :rules="rules" @submit.prevent="login()">
            <n-form-item class="mb-1" path="username" :label="t('login.username')">
              <n-input id="name" v-model:value="loginInfo.username" autofocus :placeholder="t('login.username')" />
            </n-form-item>
            <n-form-item class="mb-1" path="password" :label="t('login.password')">
              <n-input
                id="name" v-model:value="loginInfo.password" type="password" show-password-on="mousedown"
                :placeholder="t('login.password')"
              />
            </n-form-item>

            <!-- <div class="flex align-items-center justify-between mb-2">
              <RouterLink
                to="/Account/ForgotPassword"
                class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
              >
                {{ t('login.forgetPassword') }}
              </RouterLink>
            </div> -->
            <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
              {{ t('login.loginButton') }}
            </n-button>
          </n-form>
          <div class="text-center pt-4 text-sm">
            <span class="font-medium line-height-3">{{ t('login.haveNotAccount') }}</span>
            <RouterLink to="/Account/Register" class="font-medium no-underline mx-1 text-blue-500 cursor-pointer">
              {{ t('login.createAccount') }}
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
.banner {
  background-image: url('~/assets/images/login_banner.jpg');
  background-size: cover;
  background-position: center center;
  height: 150px;
  border-radius: 4px 4px 0 0;
}

.login-box {
  max-width: 380px;

  .failed {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }
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

@keyframes shake {

  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
