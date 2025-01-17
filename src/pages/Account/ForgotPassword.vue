<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui/es/form/src/interface'
import { storeToRefs } from 'pinia'
import validations from '~/common/validations'

const { t } = useI18n()
const accountStore = useAccountStore()
const { isLoading } = storeToRefs(accountStore)
const forgetInfo = ref<{ email: string }>({ email: '' })
const router = useRouter()
const formRef = ref<FormInst | null>(null)
async function resetPassword() {
  formRef.value?.validate(async (errors: any) => {
    if (!errors) {
      const loginSucceed = await accountStore.resetPassword(forgetInfo.value)
      if (loginSucceed) {
        useNotifyStore().success(t('forgot.sendEmailSuccess'))
        setTimeout(() => router.push('/Account/Login'), 500)
      }
    }
  })
}

const rules: FormRules = {
  email: [
    {
      required: true,
      validator: validations.email,
      trigger: ['blur', 'change'],
      message: t('forgot.emailValidation'),
    },
  ],
}
</script>

<route lang="yaml">
meta:
  title: forgetPassword
  layout: auth
  authRequired: false
</route>

<template>
  <div class="bg flex justify-center items-center h-screen">
    <div class="login-box w-full px-3 md:px-0">
      <div class="md:shadow-lg bg-white dark:bg-slate-800 rounded-md w-full">
        <div class="hidden md:block banner" />
        <div class="p-5">
          <div class="text-2xl font-medium mb-8">
            {{ t('forgot.title') }}
          </div>
          <n-form ref="formRef" :model="forgetInfo" :rules="rules" @submit.prevent="resetPassword()">
            <n-form-item class="mb-1" path="email" :label="t('forgot.email')">
              <n-input id="name" v-model:value="forgetInfo.email" autofocus :placeholder="t('forgot.email')" />
            </n-form-item>

            <div class="flex align-items-center my-3">
              <span class="font-medium">{{ t('forgot.rememberInfo') }}</span>
              <RouterLink to="/Account/Login" class="font-medium no-underline mx-1 text-blue-500 cursor-pointer">
                {{ t('forgot.login') }}
              </RouterLink>
            </div>

            <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
              {{ t('forgot.resetPassword') }}
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
</style>
