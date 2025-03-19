<script lang="ts" setup>
const userInfo = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
const isLoading = ref(false)
const { t } = useI18n()
function changePassword() {

}
</script>

<template>
  <div class="p-8 w-full md:w-1/3 mx-auto">
    <n-form size="large" :model="userInfo" @submit.prevent="changePassword()">
      <n-grid :span="24" cols="1" :x-gap="42" :y-gap="10">
        <n-form-item-gi :span="12" class="mb-1" path="oldPassword" :label="t('profile.oldPassword')">
          <n-input id="oldPassword" v-model:value="userInfo.oldPassword" type="password" show-password-on="mousedown" autofocus :placeholder="t('profile.oldPassword')" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" class="mb-1" path="newPassword" :label="t('profile.newPassword')">
          <n-input
            id="newPassword"
            v-model:value="userInfo.newPassword" type="password" show-password-on="mousedown"
            :placeholder="t('profile.newPassword')"
          />
        </n-form-item-gi>

        <n-form-item-gi :span="12" class="mb-1" path="confirmPassword" :label="t('profile.confirmPassword')">
          <n-input
            id="confirmPassword"
            v-model:value="userInfo.confirmPassword" type="password" show-password-on="mousedown"
            :placeholder="t('profile.confirmPassword')"
          />
        </n-form-item-gi>

        <n-gi :span="24">
          <div flex justify-start>
            <n-button attr-type="submit" size="large" type="primary" :loading="isLoading">
              {{ t('profile.changePassword') }}
            </n-button>
          </div>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>
