<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { t } = useI18n()
const accountStore = useAccountStore()
const { isLoading, loginFailed } = storeToRefs(accountStore)

async function login() {
  accountStore.login()
}
</script>

<route lang="yaml">
meta:
  title: Login
  layout: auth
</route>

<template>
  <div class="bg flex justify-center items-center h-screen">
    <div class="login-box w-full">
      <div class="shadow-lg bg-white dark:bg-slate-800 rounded-md w-full" :class="{ failed: loginFailed }">
        <div class="banner" />
        <div class="p-5">
          <!-- <img src="@/assets/images/login.jpg" alt="Image" height="50" class="mb-3"> -->
          <div class="text-2xl font-medium mb-8">
            {{ t('login.title') }}
          </div>
          <form @submit.prevent="login()">
            <div class="mb-5">
              <span class="p-float-label">
                <label for="username" class="block font-medium">{{ t('login.username') }}</label>
                <n-input id="username" />
              </span>
            </div>

            <div class="mb-8">
              <label for="password" class="block  font-medium">{{ t('login.password') }}</label>
              <n-input type="password" show-password-on="mousedown" />
            </div>
            <div class="flex align-items-center justify-between mb-10">
              <!-- <div class="flex align-items-center">
                <n-checkbox v-model="checked" aria-labelledby="remember" :binary="true" class="mr-2" />
                <span id="remember">{{ t('login.rememberMe') }}</span>
              </div> -->
              <RouterLink
                to="/Account/ForgotPassword"
                class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
              >
                {{ t('login.forgetPassword') }}
              </RouterLink>
            </div>

            <n-button attr-type="submit" size="large" :block="true" type="primary" :loading="isLoading">
              {{ t('login.loginButton') }}
            </n-button>
          </form>
          <div class="text-center pt-4 text-sm">
            <span class="font-medium line-height-3">{{ t('login.haveNotAccount') }}</span>
            <RouterLink to="/Account/Register" class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
              {{ t('login.createAccount') }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="mt-3">
        <LanguageSelect />
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
// .bg {
//   background: #f2f2f2; // linear-gradient(15deg, #006EB8 50%, #4795D1 50.1%);
// }

.banner {
  background-image: url('~/assets/images/login_banner.jpg');
  background-size: cover;
  background-position: center center;
  height: 150px;
  border-radius: 4px 4px 0 0;
}

.login-box {
  max-width: 400px;

  &.failed {
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
